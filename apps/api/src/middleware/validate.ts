import type { Request, RequestHandler, Response } from "express";
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

// Checks req.query against a zod schema. Express 5 makes req.query read-only,
// so the parsed values are returned, not written back. On bad input this sends
// a 400 and returns undefined, and the route must stop.
export function parseQuery<T extends z.ZodType>(
  schema: T,
  req: Request,
  res: Response,
): z.output<T> | undefined {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    res
      .status(400)
      .json({ error: result.error.issues[0]?.message ?? "Invalid request" });
    return undefined;
  }
  return result.data;
}
