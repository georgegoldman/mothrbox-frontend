export type StatusType = "successful" | "pending" | "cancelled";

export type User = {
  _id: string;
  email: string;
  username: string;
  phone: string;
  profilePhoto: string | null;
  keys: string | null;
  emailVerified: boolean;
  phoneNumberVerified: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  accessToken: string;
  message?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type EncryptPayload = {
  alias: string;
  owner: string; // probably user._id
  file: File;
};

export type EncryptResponse = {
  blobStoreResult: {
    newlyCreated: {
      blobObject: {
        id: string;
        registeredEpoch: number;
        blobId: string;
        size: number;
        encodingType: string;
        certifiedEpoch: number | null;
        storage: {
          id: string;
          startEpoch: number;
          endEpoch: number;
          storageSize: number;
        };
        deletable: boolean;
      };
      resourceOperation: {
        registerFromScratch: {
          encodedLength: number;
          epochsAhead: number;
        };
      };
      cost: number;
    };
  };
  path: string;
}[];

export type ErrorResponse = {
  message?: string;
};

export interface HistoryItem {
  _id: string;
  userId: string;
  filename: string;
  filesize: string;
  type: string;
  operation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryResponse {
  docs: HistoryItem[];
  totalDocs: number;
  next: number | null;
  prev: number | null;
  limit: number;
  page: number;
  totalPages: number;
}
