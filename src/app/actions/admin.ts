"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateSubmissionStatus } from "@/lib/submissions";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "vertex2024";
const SESSION_COOKIE = "vd_admin_session";
const SESSION_VALUE = "authenticated";

export async function adminLogin(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;

  if (password !== ADMIN_PASSWORD) {
    return { error: "Incorrect password. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

export async function markStatus(id: string, status: "new" | "read" | "replied") {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (session?.value !== SESSION_VALUE) redirect("/admin");
  updateSubmissionStatus(id, status);
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (session?.value !== SESSION_VALUE) redirect("/admin");
}
