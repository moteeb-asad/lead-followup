import { Navigate, NavLink, Outlet, useNavigate } from "react-router";
import { useLogout, useMe } from "@/features/auth/hooks/useAuth";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/leads", label: "Leads", end: false },
];

function StatusScreen({ children }: { children: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
      {children}
    </div>
  );
}

// Anyone without a session is sent to the login page.
export default function AdminLayout() {
  const me = useMe();
  const logout = useLogout();
  const navigate = useNavigate();

  if (me.isPending) return <StatusScreen>Checking your session…</StatusScreen>;
  if (me.isError) {
    return <StatusScreen>Can't reach the API. Is it running?</StatusScreen>;
  }
  if (!me.data) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <span className="font-semibold">Lead Follow-up</span>
          <nav className="flex gap-4 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-blue-700"
                    : "text-slate-600 hover:text-slate-900"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <span className="text-slate-600">{me.data.email}</span>
            <button
              type="button"
              disabled={logout.isPending}
              onClick={() =>
                logout.mutate(undefined, {
                  onSuccess: () => navigate("/admin/login", { replace: true }),
                })
              }
              className="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-100 disabled:opacity-50"
            >
              {logout.isPending ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
