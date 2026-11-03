import { Navigate, Outlet } from "react-router";
import FlowBoard from "../features/auth/components/FlowBoard";
import { useMe } from "../features/auth/hooks/useAuth";

// The left panel stays mounted while the right side switches between auth
// pages (login now, register later). Someone already logged in goes to /admin.
export default function AuthLayout() {
  const me = useMe();
  if (me.data) return <Navigate to="/admin" replace />;

  return (
    <div className="flex min-h-screen flex-wrap bg-paper font-sans text-ink antialiased">
      <FlowBoard />
      <main className="flex flex-[1_1_480px] items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
