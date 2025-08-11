import { useMutation } from "@tanstack/react-query";
import { encryptFile } from "@/lib/api/encrypt";
import type { EncryptPayload } from "@/lib/types";

export const useEncryptFile = () => {
  return useMutation({
    mutationFn: ({ alias, file, owner }: EncryptPayload) =>
      encryptFile(file, alias, owner),
  });
};
