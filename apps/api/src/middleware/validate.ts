import type { RequestHandler } from "express";
import type { z } from "zod";

// Checks req.body against a zod schema. Bad input gets a 400 with the first
// problem. Good input replaces req.body with the parsed data, so the next
// handler gets it trimmed and typed.
export function validate<T extends z.ZodType>(
  schema: T,
): RequestHandler<Record<string, string>, unknown, z.output<T>> {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: result.error.issues[0]?.message ?? "Invalid request" });
      return;
    }
    req.body = result.data;
    next();
  };
}
