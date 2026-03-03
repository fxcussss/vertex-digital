"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { addSubmission } from "@/lib/submissions";
import { rateLimit } from "@/lib/rateLimit";
import { sanitize } from "@/lib/sanitize";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long")
    .regex(/^[\p{L}\s'\-\.]+$/u, "Name contains invalid characters"),
  email: z.string().email("Please enter a valid email address").max(254),
  phone: z
    .string()
    .regex(/^\+230\s?\d{3}\s?\d{4}$/, "Please enter a valid Mauritius number (e.g. +230 5XX XXXX)")
    .optional()
    .or(z.literal("")),
  service: z.enum(["web", "brand", "seo", "ecommerce", "mobile", "strategy", "other"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactResult =
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> };

export async function submitContactForm(
  _prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  // ── Rate limiting: 5 submissions per minute per IP ──
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { success: allowed } = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!allowed) {
    return {
      success: false,
      errors: { _global: ["Too many requests. Please wait a minute and try again."] },
    };
  }

  // ── Tactile delay (1.2s) ──
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // ── Sanitize raw input before validation ──
  const raw = {
    name: sanitize(formData.get("name") as string ?? ""),
    email: sanitize(formData.get("email") as string ?? ""),
    phone: sanitize((formData.get("phone") as string) ?? ""),
    service: sanitize(formData.get("service") as string ?? ""),
    message: sanitize(formData.get("message") as string ?? ""),
  };

  // ── Zod validation ──
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const [field, issues] of Object.entries(parsed.error.flatten().fieldErrors)) {
      errors[field] = issues ?? [];
    }
    return { success: false, errors };
  }

  // ── Persist to data/submissions.json ──
  addSubmission({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? "",
    service: parsed.data.service,
    message: parsed.data.message,
  });

  return {
    success: true,
    message: `Thanks ${parsed.data.name}! We'll be in touch within 24 hours.`,
  };
}
