import argon2 from "argon2";
import { Router } from "express";
import {
  hashSessionToken,
  newSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
  sessionCookieOptions,
} from "../../lib/session-cookie.ts";
import { loginLimiter } from "../../middleware/rate-limit.ts";
import { validate } from "../../middleware/validate.ts";
import {
  createSession,
  deleteSession,
  findUserByEmail,
} from "./auth.queries.ts";
import { loginBody } from "./auth.schemas.ts";

export const authRouter = Router();

// Checked when the email doesn't exist, so a wrong email takes as long as a
// wrong password and the timing doesn't reveal which accounts exist.
const dummyHash = await argon2.hash("not-a-real-password");

authRouter.post(
  "/login",
  loginLimiter,
  validate(loginBody),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    const passwordOk = await argon2.verify(
      user?.password_hash ?? dummyHash,
      password,
    );
    if (!user || !passwordOk) {
      res.status(401).json({ error: "Email or password is wrong" });
      return;
    }

    const token = newSessionToken();
    await createSession(
      hashSessionToken(token),
      user.id,
      new Date(Date.now() + SESSION_MAX_AGE_MS),
    );

    res.cookie(SESSION_COOKIE, token, {
      ...sessionCookieOptions,
      maxAge: SESSION_MAX_AGE_MS,
    });
    res.json({ id: user.id, email: user.email });
  },
);

authRouter.post("/logout", async (req, res) => {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  if (typeof token === "string") {
    await deleteSession(hashSessionToken(token));
  }
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
  res.status(204).end();
});
