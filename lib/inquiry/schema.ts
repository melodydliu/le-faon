/**
 * Validation shared by the browser and the server.
 * The server always re-validates; the browser uses the same rules for inline messages.
 */

import { z } from "zod";

export const NOTE_MAX = 500;
export const MESSAGE_MAX = 4000;

const requiredText = (message: string, max = 200) => z.string().trim().min(1, message).max(max);

export const inquiryItemSchema = z.object({
  productSlug: z.string().trim().min(1).max(100),
  colorway: z.string().trim().min(1).max(50),
  size: z.string().trim().min(1).max(10),
  note: z.string().trim().max(NOTE_MAX, `Please keep notes under ${NOTE_MAX} characters`).default(""),
});

export const shippingSchema = z.object({
  line1: requiredText("Please add your street address"),
  line2: z.string().trim().max(200).optional().default(""),
  city: requiredText("Please add your city", 100),
  region: requiredText("Please add your state or region", 100),
  postalCode: requiredText("Please add your postal code", 20),
  country: requiredText("Please choose your country", 100),
});

export const inquirySubmissionSchema = z.object({
  items: z.array(inquiryItemSchema).min(1, "Your inquiry has no pieces yet").max(30),
  name: requiredText("Please add your name", 120),
  email: z.email("Please check your email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please add a phone number we can reach you on")
    .max(40)
    .regex(/^[+()\d\s.-]+$/, "Please use digits, spaces and + ( ) - only"),
  shipping: shippingSchema,
  notes: z.string().trim().max(MESSAGE_MAX).optional().default(""),
  acknowledged: z.literal(true, "Please confirm you understand how made-to-order works"),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});

export type InquirySubmission = z.input<typeof inquirySubmissionSchema>;
export type ValidInquirySubmission = z.output<typeof inquirySubmissionSchema>;

export const contactSubmissionSchema = z.object({
  name: requiredText("Please add your name", 120),
  email: z.email("Please check your email address").max(200),
  message: requiredText("Please write a short message", MESSAGE_MAX),
  website: z.string().max(0).optional().default(""),
});

export type ContactSubmission = z.input<typeof contactSubmissionSchema>;
export type ValidContactSubmission = z.output<typeof contactSubmissionSchema>;

/** Field path → first message, e.g. { "shipping.city": "Please add your city" }. */
export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
