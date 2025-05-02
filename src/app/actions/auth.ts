/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type LoginResponse = {
  accessToken?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
};

type RegisterResponse = {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    phone: string;
  };
};

export async function loginAction(data: { email: string; password: string }) {
  const response = await fetch(
    "https://mothrbox-backend-9vxz.onrender.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );

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
  const response = await fetch(
    "https://mothrbox-backend-9vxz.onrender.com/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const result: RegisterResponse = await response.json();
  return result;
}

export async function logout() {
  document.cookie = "accessToken=; Max-Age=0; path=/;";

  window.location.href = "/auth/login";
}
