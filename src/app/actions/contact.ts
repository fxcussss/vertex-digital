"use server";

import { z } from "zod";
import { addSubmission } from "@/lib/submissions";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+230\s?\d{3}\s?\d{4}$/, "Please enter a valid Mauritius number (e.g. +230 5XX XXXX)")
    .optional()
    .or(z.literal("")),
  service: z.enum(["web", "brand", "seo", "ecommerce", "mobile", "strategy", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

export type ContactResult =
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> };

export async function submitContactForm(
  _prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  // 1.2s tactile delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) ?? "",
    service: formData.get("service") as string,
    message: formData.get("message") as string,
  };

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const [field, issues] of Object.entries(parsed.error.flatten().fieldErrors)) {
      errors[field] = issues ?? [];
    }
    return { success: false, errors };
  }

  // Persist to data/submissions.json
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
