import { useState } from "react";

const labelClass =
  "flex items-baseline gap-3 font-mono text-label text-muted uppercase";
const inputClass =
  "h-11 border border-ink bg-card px-3 text-base focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

// TODO(week 2): POST /api/auth/login, then go to /admin.
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="mt-8 flex flex-col gap-5 border-2 border-ink bg-card p-6 shadow-hard-lg sm:p-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className={labelClass}>
          <span className="text-ink">01</span>Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={`${inputClass} w-full`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="login-password" className={labelClass}>
          <span className="text-ink">02</span>Password
        </label>
        <div className="flex">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${inputClass} min-w-0 flex-1 border-r-0`}
          />
          <button
            type="button"
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((shown) => !shown)}
            className="h-11 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
      >
        Log in
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M4 12h15" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
