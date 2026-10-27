import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-50 text-slate-900">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <Link to="/form" className="text-sm text-blue-700 hover:underline">
        Go to the lead form
      </Link>
    </main>
  );
}
