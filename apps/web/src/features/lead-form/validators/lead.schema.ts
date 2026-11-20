import { z } from "zod";

// The same rules as the API (apps/api/src/features/leads/leads.schemas.ts), so
// people get feedback before sending. The API's check is the one that counts.
export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(100, "Name is too long (100 characters at most)"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(
      z
        .email("Enter a valid email")
        .max(254, "Email is too long (254 characters at most)"),
    ),
  phone: z.string().trim().max(30, "Phone is too long (30 characters at most)"),
  service: z.string().max(100),
  message: z
    .string()
    .trim()
    .max(5000, "Message is too long (5000 characters at most)"),
  // Honeypot (decision 0004): hidden from people, so it is always empty for
  // them. The API drops a lead where it has a value.
  company: z.string().max(200),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
