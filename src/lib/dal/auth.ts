/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginAction, registerAction, logout } from "../api/auth"; // adjust path if needed
import { queryKeys } from "../query-keys";
import type { LoginPayload, RegisterPayload, User } from "../types";
import { api } from "../axios";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginPayload) => loginAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => Promise.resolve(logout()),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

// Example: Get current logged-in user if you plan to support a "me" endpoint
export const useUser = () =>
  useQuery<User>({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const res = await api.get<User>("/auth/me");
      return res.data;
    },
    staleTime: 60 * 60 * 1000, // 1hr
  });
