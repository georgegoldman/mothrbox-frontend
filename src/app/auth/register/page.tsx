"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { InputField } from "@/components/ui/input-field";
import { registerAction } from "@/app/actions/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

// Password regex for validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Zod schema
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^\+?\d{10,}$/, "Enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number, and special character",
    ),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Evaluate password strength
  const evaluatePasswordStrength = (password: string) => {
    let score = 0;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 8) score++;
    setPasswordStrength(score);
  };

  // Watch password input to update strength
  useEffect(() => {
    evaluatePasswordStrength(passwordValue || "");
  }, [passwordValue]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      toast.promise(
        registerAction({
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
        {
          loading: "Creating account...",
          success: () => {
            window.location.href = "/auth/login?registered=true";
            return "Registration successful!";
          },
          error: (err: unknown) => {
            if (err && typeof err === "object" && "message" in err) {
              return (
                (err as { message?: string }).message ?? "Registration failed!"
              );
            }
            return "Registration failed!";
          },
        },
      );
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  // Determine strength label and color
  const getStrengthLabel = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3 || passwordStrength === 4) return "Medium";
    if (passwordStrength >= 5) return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3 || passwordStrength === 4)
      return "bg-yellow-500";
    if (passwordStrength >= 5) return "bg-green-500";
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm">
      <h1 className="mb-3 text-center text-xl font-bold lg:text-[32px]">
        Welcome to Mothrbox!
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

          <div className="relative">
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

            {passwordValue && (
              <>
                {/* Password Strength Bar */}
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                {/* Optional: Show strength label */}
                <p
                  className="mt-1 text-xs font-semibold"
                  style={{
                    color: getStrengthColor()
                      ? getStrengthColor()!.replace("bg-", "")
                      : undefined,
                  }}
                >
                  {getStrengthLabel()}
                </p>
              </>
            )}
          </div>
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
          className="w-full cursor-pointer rounded-md bg-purple-600 px-4 py-2.5 text-base font-medium text-white transition duration-200 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Sign Up
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
