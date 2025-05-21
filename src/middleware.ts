// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("Middleware invoked for:", request.nextUrl.pathname);

  const { pathname } = new URL(request.url);
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies: Record<string, string> = Object.fromEntries(
    cookieHeader
      .split("; ")
      .map((c: string): [string, string] | null => {
        const [name, ...rest] = c.split("=");
        if (name) {
          return [name, rest.join("=")];
        }
        return null;
      })
      .filter((entry): entry is [string, string] => entry !== null),
  );
  const token = cookies.accessToken;
  // console.log("Access token:", token);

  // 🛡️ un-authenticated users can't route to /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("No token found, redirecting...");
      return NextResponse.redirect(
        new URL("/auth/login?msg=not-logged-in", request.url),
      );
    }
  }

  // 🚫 logged-in users can't access /auth routes
  if (
    pathname === "/auth" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  ) {
    if (token) {
      console.log(`Token (${token}) found, redirecting...`);
      return NextResponse.redirect(
        new URL("/dashboard?msg=already-logged-in", request.url),
      );
    }
  }
  return NextResponse.next();
}
