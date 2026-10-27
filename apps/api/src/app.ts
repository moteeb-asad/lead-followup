import express, { type ErrorRequestHandler } from "express";
import { healthRouter } from "./routes/health.ts";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  app.use("/api/health", healthRouter);

  // Any /api route that didn't match above
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  };
  app.use(errorHandler);

  return app;
}
