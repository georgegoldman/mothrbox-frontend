/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type LoginResponse = {
  accessToken?: string;
  _id: string;
  email: string;
  phone: string;
  username: string;
};

type RegisterResponse = {
  message: string;
  user?: {
    _id: string;
    username: string;
    email: string;
    phone: string;
  };
};

type UserDataResponse = {
  _id: string;
  username: string;
  email: string;
  phone: string;
};

// interface UserProfile {
//   id: string;
// }

// interface Delete {
//   _id: string;
// }

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const result: LoginResponse = await response.json();
  return result;
}

export async function registerAction(data: {
  username: string;
  email: string;
  phone: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const result: RegisterResponse = await response.json();
  return result;
}

export async function logout() {
  // Clear cookies
  document.cookie = "accessToken=; Max-Age=0; path=/;";
  document.cookie = "userId=; Max-Age=0; path=/;";

  // Remove user data from localStorage
  localStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "/auth/login";
}

export async function userProfile(
  _id: string,
  accessToken: string,
): Promise<UserDataResponse> {
  const response = await fetch(`${API_URL}/user/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  const result: UserDataResponse = await response.json();
  console.log(result);
  return result;
}

export async function deleteAccount({
  _id,
  accessToken,
}: {
  _id: string;
  accessToken: string;
}) {
  console.log(accessToken);
  const response = await fetch(`${API_URL}/user/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Account deletion failed");
  }

  window.location.href = "/";
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.split("=")[1]}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error?.message ?? String(error))),
);
