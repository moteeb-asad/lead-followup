import { Router } from "express";
import { pool } from "../../db.ts";
import { healthLimiter } from "../../middleware/rate-limit.ts";

export const healthRouter = Router();

healthRouter.get("/", healthLimiter, async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "up" });
  } catch {
    res.status(503).json({ status: "error", database: "down" });
  }
});
