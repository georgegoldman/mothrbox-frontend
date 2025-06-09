import { getCookieValue } from "@/lib/helpers";

type AuthResponse = {
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

  const result = (await response.json()) as AuthResponse;
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

// T3 CHAT
// Simple logging utility for demonstration.
// In a real app, consider a more robust logging library.
const LOG_PREFIX = "[FileService]";
const log = (
  level: "info" | "warn" | "error" | "debug",
  message: string,
  ...args: unknown[]
) => {
  console[level](`${LOG_PREFIX} ${message}`, ...args);
};

// Helper to handle API responses and throw standardized errors
async function handleApiResponse(
  res: globalThis.Response,
  action: string,
): Promise<globalThis.Response> {
  log("info", `Server response status for ${action}:`, res.status);
  if (!res.ok) {
    let errorData: { message?: string } = {};
    try {
      errorData = (await res.json()) as { message?: string };
    } catch (e) {
      log("warn", `Could not parse error response for ${action}.`, e);
      // Fallback if not JSON
    }
    log("error", `${action} failed:`, errorData.message ?? res.statusText);
    throw new Error(errorData.message ?? `${action} failed`);
  }
  return res;
}

/**
 * Encrypts and uploads a file to the Rust backend.
 *
 * @param file The file to be encrypted.
 * @param alias The identifier for the key alias to use.
 * @param owner The owner's address (e.g., wallet address).
 * @returns A Promise that resolves with the blob_id, alias, and user_id returned by the server.
 */
export async function uploadFile(
  file: File,
  alias: string,
  owner: string, // New parameter for the Rust backend
): Promise<{ blob_id: string; alias: string; user_id: string }> {
  const accessToken = getCookieValue("accessToken");
  const userId = getCookieValue("userId");

  if (!accessToken) {
    throw new Error("Access token not found. Please log in.");
  }

  log("info", `Uploading file: ${file.name} for user: ${userId}`);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("owner", owner); // New field for the Rust backend

  const res = await fetch(`${API_URL}/encrypt/${userId}/${alias}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // No 'Content-Type' header needed for FormData; browser sets it
    },
    credentials: "include", // Assuming cookies are still relevant for auth
    body: formData,
  });

  const processedRes = await handleApiResponse(res, "File encryption");
  const responseData = (await processedRes.json()) as {
    blob_id: string;
    alias: string;
    user_id: string;
  };

  log("info", `File encrypted successfully. Blob ID: ${responseData.blob_id}`);
  return responseData;
}

/**
 * Downloads and decrypts a previously encrypted file from the Rust backend.
 *
 * @param blobId The ID of the encrypted file (obtained from `uploadFile`).
 * @param alias The key alias used during encryption.
 * @param originalFileName The original name of the file before encryption (needed for client-side download).
 * @returns A Promise that resolves with the decrypted Blob, its original file name, and file type.
 */
export async function downloadAndDecryptFile(
  blobId: string,
  alias: string,
  originalFileName: string, // Now required to know the name for download
): Promise<{
  decryptedBlob: Blob;
  originalFileName: string;
  originalFileType: string;
}> {
  const accessToken = getCookieValue("accessToken");
  const userId = getCookieValue("userId");

  if (!accessToken) {
    throw new Error("Access token not found. Please log in.");
  }

  log("info", `Decrypting file with blob ID: ${blobId} for user: ${userId}`);

  const res = await fetch(`${API_URL}/decrypt/${userId}/${alias}/${blobId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", // Assuming cookies are still relevant for auth
    // No body for GET request
  });

  const processedRes = await handleApiResponse(res, "File decryption");
  const decryptedBlob = await processedRes.blob();

  log("info", `Decrypted file size: ${decryptedBlob.size} bytes`);

  // The Rust backend API spec implies 'Content-Type: application/msgpack'.
  // We need to decide how to derive the original file type or if it's sent via custom headers.
  // For now, let's assume the 'Content-Type' of the decrypted blob might be the true type
  // or that we'll rely on the originalFileName's extension.
  const originalFileType =
    processedRes.headers.get("Content-Type") ?? "application/octet-stream"; // Default if not provided

  // Original file name is now passed in as a parameter since the API doesn't provide it directly in headers for GET.
  // If your Rust backend *does* add a custom header (e.g., 'X-Original-File-Name'),
  // you'd re-implement the header parsing here.
  log(
    "info",
    `Determined original file type: ${originalFileType}. Using client-provided originalFileName: ${originalFileName}`,
  );

  return {
    decryptedBlob,
    originalFileName, // Using the name passed to the function
    originalFileType,
  };
}

/**
 * Maps common MIME types to file extensions.
 * @param mimeType The MIME type string.
 * @returns The corresponding file extension or null if not found.
 */
function getExtensionFromMimeType(mimeType: string): string | null {
  const mimeToExt: Record<string, string> = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "image/jpeg": "jpg",
    "image/png": "png",
    "text/plain": "txt",
    "application/zip": "zip",
    "application/json": "json",
    // 🔥 Add more as needed based on your expected file types
  };
  return mimeToExt[mimeType] ?? null;
}

/**
 * Triggers a file download in the browser.
 *
 * @param blob The Blob data to download.
 * @param fileName The desired name for the downloaded file.
 * @param fileType Optional MIME type of the file.
 */
export function triggerFileDownload(
  blob: Blob,
  fileName: string,
  fileType?: string,
) {
  log("info", `Triggering download for: ${fileName}`);
  log("debug", `Blob type for download: ${fileType ?? "not specified"}`);

  let finalFileName = fileName;

  // Add extension if missing and fileType is known
  if (fileType && !fileName.includes(".")) {
    const extension = getExtensionFromMimeType(fileType);
    if (extension) {
      finalFileName = `${fileName}.${extension}`;
    }
  }

  // Create a Blob with the specified type if provided, otherwise use the original blob
  const downloadBlob = fileType ? new Blob([blob], { type: fileType }) : blob;

  const url = window.URL.createObjectURL(downloadBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = finalFileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url); // Clean up the object URL
  document.body.removeChild(a); // Clean up the anchor element

  log("info", `Download triggered successfully for: ${finalFileName}`);
}
