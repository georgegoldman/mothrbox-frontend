import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("auth_token")?.value;

  const protectedPath = ["/dashboard"];
  const isProtected = protectedPath.some((path) => {
    return request.nextUrl.pathname.startsWith(path);
  });

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
