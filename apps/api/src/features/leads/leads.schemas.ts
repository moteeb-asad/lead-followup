import { z } from "zod";

// The form sends "" for a field the person left empty. Store that as NULL.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? null : value))
    .nullish()
    .transform((value) => value ?? null);

// What the public form sends. Keys that aren't listed here are dropped.
export const publicLeadBody = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email").max(254)),
  phone: optionalText(30),
  service: optionalText(100),
  message: optionalText(5000),
});

export type NewLead = z.output<typeof publicLeadBody>;
