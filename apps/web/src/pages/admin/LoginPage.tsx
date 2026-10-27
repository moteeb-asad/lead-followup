const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none";

// TODO(week 2): POST /api/auth/login, then go to /admin.
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            disabled
            className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Log in
          </button>
          <p className="text-xs text-slate-500">
            Login arrives with the API (week 2).
          </p>
        </form>
      </div>
    </main>
  );
}
