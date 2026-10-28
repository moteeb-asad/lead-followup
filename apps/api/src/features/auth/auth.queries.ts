import { pool } from "../../db.ts";

export type SessionUser = { id: string; email: string };
type UserWithHash = SessionUser & { password_hash: string };

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

// The user behind a session that hasn't expired, or undefined.
export async function findSessionUser(tokenHash: string) {
  const { rows } = await pool.query<SessionUser>(
    `SELECT u.id, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [tokenHash],
  );
  return rows[0];
}

export async function deleteSession(tokenHash: string) {
  await pool.query("DELETE FROM sessions WHERE token_hash = $1", [tokenHash]);
}
