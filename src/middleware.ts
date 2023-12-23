import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signUp" || path === "/verifyEmail";
  const isProfilePath = path.startsWith("/profile");
  const token = request.cookies.get("token")?.value || "";

  if (isProfilePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signUp", "/profile", "/profile/:path*","/verifyEmail"],
};
