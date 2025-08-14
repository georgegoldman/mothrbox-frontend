import { api } from "../axios"; // adjust import path
import type { AxiosResponse } from "axios";
import type { LoginPayload, RegisterPayload, User } from "../types";

export const loginAction = async (data: LoginPayload): Promise<User> => {
  const res = await api.post<User>("/auth/login", data);

  if (res.data?.accessToken) return res.data;

  throw new Error(res.data.message ?? "Login Failed");
};

export const registerAction = async (data: RegisterPayload): Promise<User> => {
  const res: AxiosResponse<User> = await api.post("/auth/register", data);

  if (res.data?.accessToken) return res.data;

  throw new Error(res.data.message ?? "Registration failed");
};

export const logout = async () => {
  try {
    // Clear cookies
    document.cookie = "accessToken=; Max-Age=0; path=/;";
    document.cookie = "userId=; Max-Age=0; path=/;";

    // Clear localStorage
    localStorage.removeItem("user");

    // Redirect to login
    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
