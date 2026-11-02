import { useState } from "react";
import { useForm } from "react-hook-form";
import { useActionState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginInput,
} from "@/src/features/auth/validators/auth.schema";

const labelClass =
  "flex items-baseline gap-3 font-mono text-label text-muted uppercase";
const inputClass =
  "h-11 border border-ink bg-card px-3 text-base focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

// 1. Define the asynchronous login action that communicates with Express
async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || "Invalid email or password" };
    }

    const user = await response.json();

    // Redirect on success
    window.location.href = "/admin";
    return { error: null, success: true, user };
  } catch (err) {
    console.log(err);
    return { error: "Network error. Please try again later." };
  }
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(loginAction, undefined);
  const [_isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      {(state?.error || errors.email || errors.password) && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-danger/20 bg-danger/10 p-3">
          <span className="material-symbols-outlined !text-[20px] text-danger">
            error
          </span>
          <div className="text-sm text-danger font-medium">
            {state?.error || errors.email?.message || errors.password?.message}
          </div>
        </div>
      )}
      <form
        className="mt-8 flex flex-col gap-5 border-2 border-ink bg-card p-6 shadow-hard-lg sm:p-8"
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append("email", data.email);
          formData.append("password", data.password);

          startTransition(() => {
            formAction(formData);
          });
        })}
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
    </>
  );
}
