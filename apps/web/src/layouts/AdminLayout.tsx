import { Navigate, Outlet } from "react-router";
import { useMe } from "@/features/auth/hooks/useAuth";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

function StatusScreen({ children }: { children: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper font-mono text-label text-muted uppercase">
      {children}
    </div>
  );
}

// The shell for every /admin page: sidebar, header, and the page in <Outlet />.
// Anyone without a session is sent to the login page.
export default function AdminLayout() {
  const me = useMe();

  if (me.isPending) return <StatusScreen>Checking your session…</StatusScreen>;
  if (me.isError) {
    return <StatusScreen>Can't reach the API. Is it running?</StatusScreen>;
  }
  if (!me.data) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen flex-wrap bg-paper font-sans text-ink antialiased">
      <AdminSidebar />
      <div className="flex min-w-0 flex-[999_1_560px] flex-col">
        <AdminHeader email={me.data.email} />
        <main className="flex flex-1 flex-col gap-10 px-6 py-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
