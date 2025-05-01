"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    // Handle signup logic here
    console.log("Signup attempt with:", { username, emailPhone, password });
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Welcome to Cryptix!
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="emailPhone" className="block text-sm font-medium">
            Email/Phone Number
          </label>
          <input
            id="emailPhone"
            type="text"
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            placeholder="example@email.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
            By clicking continue to join or sign in, you agree to{" "}
            <Link
              href="/terms"
              className="text-purple-600 hover:text-purple-700"
            >
              Cryptix User Agreement
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

        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-purple-700"
        >
          Sign up
        </button>

        <div className="text-center text-sm text-gray-500">OR</div>
      </form>

      <div className="mt-6 text-center text-sm">
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
