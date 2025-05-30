import { getCookieValue } from "@/lib/helpers";

type Response = {
  message?: string;
  accessToken?: string;
  _id: string;
  email: string;
  phone: string;
  username: string;
};

// type Response = {
//   message?: string;
//   accessToken?: string;
//   _id: string;
//   username: string;
//   email: string;
//   phone: string;
// };

type UserDataResponse = {
  _id: string;
  username: string;
  email: string;
  phone: string;
};

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
    const errorData = (await response.json()) as { message: string };
    throw new Error(errorData.message || "Login failed");
  }

  const result = (await response.json()) as Response;
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
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message: string };
    throw new Error(errorData.message || "Registration failed");
  }

  const result = (await response.json()) as Response;
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
    const errorData = (await response.json()) as { message: string };
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  const result = (await response.json()) as UserDataResponse;
  console.log(result);
  return result;
}

export async function deleteAccount({ accessToken }: { accessToken: string }) {
  console.log(accessToken);
  const response = await fetch(`${API_URL}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message: string };
    throw new Error(errorData.message || "Account deletion failed");
  }

  window.location.href = "/";
}

type UploadFileResponse = {
  url: string;
  filename: string;
  message?: string;
};

export async function uploadFile(file: File, alias: string): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alias", alias);

  const accessToken = getCookieValue("accessToken");

  const res = await fetch(`${API_URL}/file-upload/encrypt`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "File upload failed");
  }

  const blob = await res.blob();

  // ✅ Add .enc to full original name (with extension)
  const filename = `${file.name}.enc`;

  // 🧲 Download logic
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}

// export async function uploadFile(
//   file: File,
//   alias: string,
// ): Promise<UploadFileResponse> {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("alias", alias);

//   const accessToken = getCookieValue("accessToken");

//   const res = await fetch(`${API_URL}/file-upload/encrypt`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     credentials: "include",
//     body: formData,
//   });

//   if (!res.ok) {
//     const errorData = (await res.json()) as { message: string };
//     throw new Error(errorData.message || "File upload failed");
//   }

//   const result = (await res.json()) as UploadFileResponse;
//   return result;
// }

// export async function registerAction(data: {
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
// }) {
//   try {
//     // STEP 1: REGISTER
//     const registerRes = await fetch(`${API_URL}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//       credentials: "include",
//     });

//     const registerResult = (await registerRes.json()) as RegisterResponse;

//     // Logs raw output
//     console.log("📥 registerResult raw:", registerResult);

//     if (!registerRes.ok || !registerResult._id) {
//       console.error("❌ Registration API error:", registerResult);
//       throw new Error(registerResult.message ?? "Registration failed");
//     }

//     const user = {
//       _id: registerResult._id,
//       username: registerResult.username,
//       email: registerResult.email,
//       phone: registerResult.phone,
//       accessToken: registerResult.accessToken,
//     };

//     // STEP 2: GENERATE KEY
//     const keyPayload = {
//       algorithm: "AES",
//       owner: user._id,
//       alias: `mtx-${user._id.slice(0, 10)}`,
//     };

//     const accessToken = user.accessToken;

//     const keyRes = await fetch(`${API_URL}/keys/generate`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(keyPayload),
//       credentials: "include",
//     });

//     const keyResult = (await keyRes.json()) as KeyGenResponse;

//     if (!keyRes.ok || keyResult.status !== 200) {
//       console.error("❌ Key generation failed:", keyResult);
//       throw new Error(keyResult.message || "Key generation failed");
//     }

//     console.log("✅ User created:", user);
//     console.log("🔑 Key created:", keyResult);

//     return {
//       user,
//       keyStatus: keyResult.status,
//       keyMessage: keyResult.message,
//     };
//   } catch (error) {
//     console.error("🔥 Registration process failed:", error);

//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }

//     throw new Error("Unexpected error occurred during registration.");
//   }
// }
