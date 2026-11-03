import type { RequestHandler } from "express";
import {
  findSessionUser,
  type SessionUser,
} from "../features/auth/auth.queries.ts";
import { hashSessionToken, SESSION_COOKIE } from "../lib/session-cookie.ts";

declare global {
  namespace Express {
    interface Locals {
      // Set by requireAuth. Only read it in routes that use requireAuth.
      user: SessionUser;
    }
  }
}

// Lets the request through only with a valid, unexpired session cookie.
export const requireAuth: RequestHandler = async (req, res, next) => {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  const user =
    typeof token === "string"
      ? await findSessionUser(hashSessionToken(token))
      : undefined;

  if (!user) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  res.locals.user = user;
  next();
};
