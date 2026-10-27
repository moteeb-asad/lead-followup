import LoginForm from "../../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <p className="font-mono text-label text-muted uppercase">
        Admin · Sign in
      </p>
      <h1 className="mt-2 text-4xl font-extrabold font-stretch-expanded tracking-tight">
        Log in
      </h1>
      <LoginForm />
      <p className="mt-6 font-mono text-xs text-muted">
        One admin account in this version.
      </p>
    </>
  );
}
