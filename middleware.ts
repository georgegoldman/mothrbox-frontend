// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const cookieHeader = request.headers.get("cookie") ?? "";
  console.log("Cookies header:", cookieHeader);
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
  console.log("Parsed cookies:", cookies);
  const token = cookies.accessToken;
  console.log("Access token:", token);

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("No token, redirecting...");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}
