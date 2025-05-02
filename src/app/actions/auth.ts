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

interface Delete {
  id: string;
}

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

export async function userProfile(
  id: string,
  accessToken: string,
): Promise<UserDataResponse> {
  const response = await fetch(
    `https://mothrbox-backend-9vxz.onrender.com/user/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  const result: UserDataResponse = await response.json();
  console.log(result);
  return result;
}

export async function deleteAccount({ id }: Delete) {
  const response = await fetch(
    `https://mothrbox-backend-9vxz.onrender.com/user/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || "Account deletion failed");
  }

  window.location.href = "/";
}
