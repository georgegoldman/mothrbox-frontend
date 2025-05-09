"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // setError(null);
    try {
      const result = await loginAction(data);
      // console.log("Login successful:", result);

      if (result.accessToken) {
        document.cookie = `accessToken=${result.accessToken}; path=/; max-age=86400; secure; samesite=lax`;
      }

      if (result._id) {
        document.cookie = `userId=${result._id}; path=/; max-age=86400; secure; samesite=lax`;
      }

      router.push("/dashboard");
      // toast.success("Login successful!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      // Set the error state to display in your UI
      // setError(errorMessage);

      // Optionally, show a toast notification
      toast.error(errorMessage);

      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-3 text-center text-xl font-bold lg:text-[32px]">
        Welcome Back!
      </h1>

      {/* {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="e.g. johndoe@gmail.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="font-bold lg:text-lg">
              Password<span className="ml-1 text-red-500">*</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Forgot password?
            </Link>
          </div>

          <InputField
            id="password"
            label=""
            labelClassName="sr-only"
            containerClassName="space-y-0"
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
            showPasswordToggle
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-md bg-purple-600 px-4 py-2.5 text-base font-medium text-white transition duration-200 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-3 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-purple-600 hover:text-purple-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
