// types/auth.ts
export type LoginSuccessResponse = {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  // Add other fields your API returns on success
};

export type ErrorResponse = {
  message: string;
  statusCode?: number;
  error?: string;
  // Add other error fields your API might return
};
