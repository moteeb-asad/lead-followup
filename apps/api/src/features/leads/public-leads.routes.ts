import { Router, type RequestHandler } from "express";
import { publicLeadLimiter } from "../../middleware/rate-limit.ts";
import { validate } from "../../middleware/validate.ts";
import { createLead } from "./leads.queries.ts";
import { publicLeadBody } from "./leads.schemas.ts";

export const publicLeadsRouter = Router();

// Honeypot (decision 0004): the form has a hidden "company" field that people
// never see. A bot fills it in. Answer exactly as if the lead was saved, so
// the bot doesn't learn it was caught, but save nothing. This runs before
// validation, so a bot can't tell the two apart by getting a 400.
const honeypot: RequestHandler = (req, res, next) => {
  const body: unknown = req.body;
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    typeof body.company === "string" &&
    body.company.trim() !== ""
  ) {
    res.status(201).json({ ok: true });
    return;
  }
  next();
};

// POST /api/public/leads: the lead form on /form. Public, so it is rate
// limited and never returns the lead's id.
publicLeadsRouter.post(
  "/",
  publicLeadLimiter,
  honeypot,
  validate(publicLeadBody),
  async (req, res) => {
    await createLead(req.body, "form");
    res.status(201).json({ ok: true });
  },
);
