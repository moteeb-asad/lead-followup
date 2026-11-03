import { Link, useLocation, useNavigate } from "react-router";
import { useLogout } from "@/features/auth/hooks/useAuth";

type Crumb = { label: string; to?: string };

// The trail after "Admin", worked out from the URL.
function crumbsFor(pathname: string): Crumb[] {
  const leadId = /^\/admin\/leads\/([^/]+)/.exec(pathname)?.[1];
  if (leadId)
    return [{ label: "Leads", to: "/admin/leads" }, { label: leadId }];
  if (pathname.startsWith("/admin/leads")) return [{ label: "Leads" }];
  if (pathname.startsWith("/admin/settings")) return [{ label: "Settings" }];
  return [{ label: "Overview" }];
}

export default function AdminHeader({ email }: { email: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const crumbs = crumbsFor(pathname);

  return (
    <header className="flex min-h-16 flex-wrap items-center gap-4 border-b border-ink px-6 py-3 lg:px-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 font-mono text-label text-muted uppercase">
          <li>
            <Link to="/admin" className="hover:text-ink">
              Admin
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return [
              <li key={`${crumb.label}-sep`} aria-hidden="true">
                /
              </li>,
              <li
                key={crumb.label}
                className={isLast ? "text-ink" : undefined}
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.to && !isLast ? (
                  <Link to={crumb.to} className="hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  crumb.label
                )}
              </li>,
            ];
          })}
        </ol>
      </nav>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        {/* TODO(week 4): search leads with GET /api/leads. */}
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search leads
          </label>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            <path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 20 20" />
          </svg>
          <input
            id="search"
            type="search"
            placeholder="Search name, email, phone"
            className="h-11 w-72 max-w-full border border-ink bg-card pr-3 pl-9 text-sm placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
          />
        </div>
        <span className="hidden font-mono text-xs text-ink-2 md:inline">
          {email}
        </span>
        <button
          type="button"
          disabled={logout.isPending}
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => navigate("/admin/login", { replace: true }),
            })
          }
          className="h-11 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:opacity-60"
        >
          {logout.isPending ? "Logging out…" : "Log out"}
        </button>
      </div>
    </header>
  );
}
