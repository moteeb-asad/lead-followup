import cookieParser from "cookie-parser";
import express, { type ErrorRequestHandler } from "express";
import { authRouter } from "./features/auth/auth.routes.ts";
import { healthRouter } from "./features/health/health.routes.ts";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);

  // Any /api route that didn't match above
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const errorHandler: ErrorRequestHandler = (
    err: unknown,
    _req,
    res,
    _next,
  ) => {
    // Body parser errors (bad JSON, body too large) are the client's fault, and
    // they carry the raw request body, which can hold a password. Never log them.
    const status =
      err instanceof Error && "status" in err && typeof err.status === "number"
        ? err.status
        : 500;
    if (status < 500) {
      res.status(status).json({ error: "Invalid request body" });
      return;
    }

    // Log the stack only, not the whole error object.
    console.error(err instanceof Error ? err.stack : "Unknown error");
    res.status(500).json({ error: "Something went wrong" });
  };
  app.use(errorHandler);

  return app;
}
