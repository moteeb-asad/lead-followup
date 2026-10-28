import { createHash, randomBytes } from "node:crypto";
import type { CookieOptions } from "express";

export const SESSION_COOKIE = "sid";
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Used for both setting and clearing, so the browser matches the cookie.
export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

// The browser gets the random token. The database only stores its hash, so a
// leaked sessions table can't be used to log in.
export function newSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
