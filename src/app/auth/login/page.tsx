"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/input-field";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// new update

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login attempt with:", data);
    // 🧠 Place actual login logic here (e.g. API call)
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-3 text-center text-xl font-bold lg:text-[32px]">
        Welcome Back!
      </h1>

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
          className="w-full cursor-pointer rounded-md bg-purple-600 px-4 py-2.5 text-base font-medium text-white transition duration-200 hover:bg-purple-700"
        >
          Login
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
