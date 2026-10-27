import { Outlet } from "react-router";
import FlowBoard from "../features/auth/components/FlowBoard";

// The left panel stays mounted while the right side switches between auth
// pages (login now, register later).
export default function AuthLayout() {
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
