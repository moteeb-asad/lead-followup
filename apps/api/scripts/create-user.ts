import argon2 from "argon2";
import { z } from "zod";
import { pool } from "../src/db.ts";

// Reads the admin login from ADMIN_EMAIL and ADMIN_PASSWORD in apps/api/.env.
const env = z
  .object({
    ADMIN_EMAIL: z.email("ADMIN_EMAIL must be an email address"),
    ADMIN_PASSWORD: z
      .string("ADMIN_PASSWORD is not set")
      .min(12, "ADMIN_PASSWORD must be at least 12 characters"),
  })
  .safeParse(process.env);

if (!env.success) {
  for (const issue of env.error.issues) console.error(issue.message);
  await pool.end();
  process.exit(1);
}

const email = env.data.ADMIN_EMAIL.trim().toLowerCase();

try {
  const passwordHash = await argon2.hash(env.data.ADMIN_PASSWORD); // argon2id by default
  const { rows } = await pool.query<{ id: string }>(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
    [email, passwordHash],
  );
  console.log(`Created ${email} (id ${rows[0].id})`);
} catch (error) {
  if ((error as { code?: string }).code === "23505") {
    console.error(`${email} already exists`);
    process.exitCode = 1;
  } else {
    throw error;
  }
} finally {
  await pool.end();
}
