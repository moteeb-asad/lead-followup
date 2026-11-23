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

// The lead's own fields, whichever route it came in through.
const leadFields = z.object({
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

// What the public form sends. Keys that aren't listed here are dropped.
// submissionId is made by the browser once per send and is kept when the same
// data is sent again after a failure. It is stored as external_id, so the
// unique (source, external_id) key turns a repeat into a no-op.
export const publicLeadBody = leadFields.extend({
  submissionId: z.uuid("Invalid request"),
});

export type NewLead = z.output<typeof leadFields>;
