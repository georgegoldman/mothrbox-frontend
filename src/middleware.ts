// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // console.log("Middleware invoked for:", request.nextUrl.pathname);

  const { pathname } = new URL(request.url);
  // const cookieHeader = request.headers.get("cookie") ?? "";
  // const cookies: Record<string, string> = Object.fromEntries(
  //   cookieHeader
  //     .split("; ")
  //     .map((c: string): [string, string] | null => {
  //       const [name, ...rest] = c.split("=");
  //       if (name) {
  //         return [name, rest.join("=")];
  //       }
  //       return null;
  //     })
  //     .filter((entry): entry is [string, string] => entry !== null),
  // );
  // const accessToken = cookies.accessToken;

  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  // console.log("Access token:", token);

  // 🛡️ un-authenticated users can't route to /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      console.log("No token found, redirecting...");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // 🚫 logged-in users can't access /auth routes
  if (
    pathname === "/auth" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  ) {
    if (accessToken) {
      console.log(`Token (${accessToken}) found, redirecting...`);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  return NextResponse.next();
}
