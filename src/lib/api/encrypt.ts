import { api } from "../axios";
import { getCookieValue } from "../helpers";
import type { EncryptResponse } from "../types";

export const encryptFile = async (
  file: File,
  alias: string,
  owner: string,
): Promise<EncryptResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alias", alias);
  formData.append("owner", owner);

  try {
    const response = await api.post<Blob>("/file-upload/encrypt", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Only needed if you're receiving a file back
    });

    // Automatically download the encrypted file
    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${file.name}.enc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    return [];
  } catch (err) {
    console.error(err);

    throw new Error("Encryption failed. Please try again.");
  }
};
