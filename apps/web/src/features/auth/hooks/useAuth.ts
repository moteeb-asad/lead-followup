import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api";
import { getMe, login, logout } from "../api";

const meKey = ["me"] as const;

// The logged-in user, or null when there is no session.
export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: async () => {
      try {
        return await getMe();
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
      }
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => queryClient.setQueryData(meKey, user),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    // Drop everything cached for the old session, then mark it logged out.
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(meKey, null);
    },
  });
}
