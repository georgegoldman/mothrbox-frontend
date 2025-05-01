/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Reuse your existing Zod schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginSuccessResponse = {
  accessToken?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  // Add other fields your API returns on success
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
  error?: string;
  // Add other error fields your API might return
};

export async function loginAction(formData: FormData) {
  // Parse and validate the form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(
      "https://mothrbox-backend-9vxz.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      return {
        errors: {},
        message: errorData.message || "Login failed",
      };
    }

    const result: LoginSuccessResponse = await response.json();

    // Ensure accessToken exists and is a string
    if (typeof result.accessToken !== "string") {
      throw new Error("Invalid token received from server");
    }

    // Set secure HTTP-only cookie
    (await cookies()).set("auth_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    // Redirect to dashboard on success
    redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return {
      errors: {},
      message: "An error occurred during login",
    };
  }
}
