import axios, { type AxiosError } from "axios";
import { getCookieValue } from "./helpers";

// Create base axios instance without token at module load
export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "https://ambitious-garnet-mothrbox-backend-bdd516c0.koyeb.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach Authorization header dynamically only in the browser
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getCookieValue("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
  }
  return config;
});

export function extractApiError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    (error as AxiosError).response
  ) {
    const axiosError = error as AxiosError;

    const message =
      (axiosError.response?.data as { message: string })?.message ??
      axiosError.response?.statusText ??
      "Unknown server error";

    return message;
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
}
