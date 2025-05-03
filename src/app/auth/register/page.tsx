"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputField } from "@/components/ui/input-field";
import { registerAction } from "@/app/actions/auth";
import { toast } from "sonner";

// Zod schema for validation
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^\+?\d{10,}$/, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerAction({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      // console.log(data);
      toast.success("Account created successful!");

      router.push("/auth/login?registered=true");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      toast.error(error ?? "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm">
      <h1 className="mb-3 text-center text-xl font-bold lg:text-[32px]">
        Welcome to Mothrbox!
      </h1>

      {/* {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <InputField
            id="username"
            label="Username"
            placeholder="Choose a username"
            {...register("username")}
            error={errors.username?.message}
            autoComplete="username"
          />

          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="example@email.com"
            {...register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <InputField
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+2349012345678"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            {...register("password")}
            error={errors.password?.message}
            showPasswordToggle
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
            </div>
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
              By clicking continue to join or sign in, you agree to{" "}
              <Link
                href="/terms"
                className="text-purple-600 hover:text-purple-700"
              >
                Mothrbox User Agreement
              </Link>
              ,{" "}
              <Link
                href="/privacy"
                className="text-purple-600 hover:text-purple-700"
              >
                Privacy Policy
              </Link>
              , and{" "}
              <Link
                href="/cookie-policy"
                className="text-purple-600 hover:text-purple-700"
              >
                Cookie Policy
              </Link>
              .
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-500">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-md bg-purple-600 px-4 py-2.5 text-base font-medium text-white transition duration-200 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <div className="mt-3 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-purple-600 hover:text-purple-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
