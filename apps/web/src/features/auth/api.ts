import { api } from "@/lib/api";
import type { LoginInput } from "./validators/auth.schema";

export type User = { id: string; email: string };

export function login(input: LoginInput) {
  return api<User>("/auth/login", { method: "POST", body: input });
}

export function logout() {
  return api<void>("/auth/logout", { method: "POST" });
}

export function getMe() {
  return api<User>("/me");
}
