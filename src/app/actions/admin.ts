"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { updateSubmissionStatus } from "@/lib/submissions";
import { rateLimit } from "@/lib/rateLimit";
import { sanitize } from "@/lib/sanitize";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "vertex2024";
const SESSION_COOKIE = "vd_admin_session";

// Generate a secure session token instead of a plain string
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Store valid tokens in memory (in production use Redis/DB)
const validTokens = new Set<string>();

export async function adminLogin(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  // Rate limit: 10 attempts per 15 minutes per IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success: allowed } = rateLimit(`admin:${ip}`, 10, 900_000);

  if (!allowed) {
    return { error: "Too many login attempts. Please wait 15 minutes." };
  }

  const password = sanitize(formData.get("password") as string ?? "");

  // Constant-time comparison to prevent timing attacks
  const passwordBuffer = Buffer.from(password);
  const adminBuffer = Buffer.from(ADMIN_PASSWORD);
  const match =
    passwordBuffer.length === adminBuffer.length &&
    crypto.timingSafeEqual(passwordBuffer, adminBuffer);

  if (!match) {
    return { error: "Incorrect password. Please try again." };
  }

  const token = generateToken();
  validTokens.add(token);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/admin",
  });

  redirect("/admin/dashboard");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) validTokens.delete(token);
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

export async function markStatus(id: string, status: "new" | "read" | "replied") {
  await requireAdmin();
  // Validate id format to prevent path traversal
  if (!/^sub_\d+_[a-z0-9]+$/.test(id)) return;
  // Validate status is one of allowed values
  if (!["new", "read", "replied"].includes(status)) return;
  updateSubmissionStatus(id, status);
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !validTokens.has(token)) redirect("/admin");
}
