import { pool } from "../../db.ts";

type UserWithHash = { id: string; email: string; password_hash: string };

export async function findUserByEmail(email: string) {
  const { rows } = await pool.query<UserWithHash>(
    "SELECT id, email, password_hash FROM users WHERE lower(email) = $1",
    [email],
  );
  return rows[0];
}

export async function createSession(
  tokenHash: string,
  userId: string,
  expiresAt: Date,
) {
  await pool.query(
    "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [tokenHash, userId, expiresAt],
  );
}

export async function deleteSession(tokenHash: string) {
  await pool.query("DELETE FROM sessions WHERE token_hash = $1", [tokenHash]);
}
