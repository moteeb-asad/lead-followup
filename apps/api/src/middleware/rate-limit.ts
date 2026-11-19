import { rateLimit } from "express-rate-limit";

// 10 failed logins per IP every 15 minutes. Successful logins don't count, so
// the owner isn't locked out after logging in a few times. Counts are kept in
// memory, which is fine for one API process.
// The public lead form: 5 requests per IP every minute. Every request counts,
// including ones the honeypot catches. Same in-memory counts as the login limit.
export const publicLeadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Try again in a minute." },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});
