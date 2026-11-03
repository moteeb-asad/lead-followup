import { z } from "zod";

export const loginBody = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  // No minimum length here: that rule is for creating a password, not for
  // logging in. The maximum stops huge inputs reaching argon2.
  password: z.string().min(1, "Enter your password").max(256),
});
