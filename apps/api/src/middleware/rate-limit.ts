import { rateLimit } from "express-rate-limit";

// 10 failed logins per IP every 15 minutes. Successful logins don't count, so
// the owner isn't locked out after logging in a few times. Counts are kept in
// memory, which is fine for one API process.
// Health checks: 60 requests per IP every minute. Each one runs a database
// query, so an unlimited public route could use up the connection pool. An
// uptime monitor checking every 30 seconds stays well under this.
export const healthLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Try again in a minute." },
});

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
