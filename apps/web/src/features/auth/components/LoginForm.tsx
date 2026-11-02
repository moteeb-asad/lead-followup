import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLogin } from "@/features/auth/hooks/useAuth";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/validators/auth.schema";
import { ApiError } from "@/lib/api";

const labelClass =
  "flex items-baseline gap-3 font-mono text-label text-muted uppercase";
const inputClass =
  "h-11 border border-ink bg-card px-3 text-base placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

// 4xx errors carry a message written for the user ("Email or password is
// wrong", "Too many login attempts..."). Anything else gets a generic one.
function loginErrorMessage(error: Error | null) {
  if (!error) return undefined;
  if (error instanceof ApiError && error.status < 500) return error.message;
  return "Couldn't log in. Try again in a moment.";
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const error =
    errors.email?.message ??
    errors.password?.message ??
    loginErrorMessage(login.error);

  return (
    <>
      {error && (
        <div
          role="alert"
          className="mt-8 flex items-start gap-3 border-2 border-alert bg-alert-soft px-4 py-3 text-alert"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 4 21 20H3zM12 10v4M12 17v.5" />
          </svg>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      <form
        noValidate
        className={`${error ? "mt-4" : "mt-8"} flex flex-col gap-5 border-2 border-ink bg-card p-6 shadow-hard-lg sm:p-8`}
        onSubmit={handleSubmit((data) =>
          login.mutate(data, {
            onSuccess: () => navigate("/admin", { replace: true }),
          }),
        )}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className={labelClass}>
            <span className="text-ink">01</span>Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="name@company.com"
            autoComplete="username"
            aria-invalid={errors.email ? true : undefined}
            className={`${inputClass} w-full`}
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className={labelClass}>
            <span className="text-ink">02</span>Password
          </label>
          <div className="flex">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={errors.password ? true : undefined}
              className={`${inputClass} min-w-0 flex-1 border-r-0`}
              {...register("password")}
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
          disabled={login.isPending}
          className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt disabled:pointer-events-none disabled:opacity-60"
        >
          {login.isPending ? "Logging in…" : "Log in"}
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
    </>
  );
}
