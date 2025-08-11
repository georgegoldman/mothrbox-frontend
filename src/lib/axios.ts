import axios, { type AxiosError } from "axios";
import { getCookieValue } from "./helpers";

const token = getCookieValue("accessToken");

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "https://ambitious-garnet-mothrbox-backend-bdd516c0.koyeb.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
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
