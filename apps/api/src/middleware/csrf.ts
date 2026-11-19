import type { RequestHandler } from "express";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

// CSRF protection for the session cookie. The cookie is already SameSite=Lax
// and the API only reads JSON bodies. This adds a check on top: a request that
// changes data must come from our own origin, or from a client that isn't a
// browser (curl, a webhook sender), which has no session cookie to abuse.
// https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
export const csrfOriginCheck: RequestHandler = (req, res, next) => {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  // Browsers send Sec-Fetch-Site and a page can't change it.
  const fetchSite = req.get("sec-fetch-site");
  if (fetchSite !== undefined) {
    if (fetchSite === "same-origin" || fetchSite === "none") {
      next();
      return;
    }
    res.status(403).json({ error: "Cross-site request blocked" });
    return;
  }

  // Older browsers only send Origin. It must be this host. An unparseable
  // Origin, such as "null", is rejected.
  const origin = req.get("origin");
  if (origin !== undefined) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (originHost !== req.get("host")) {
      res.status(403).json({ error: "Cross-site request blocked" });
      return;
    }
  }

  next();
};
