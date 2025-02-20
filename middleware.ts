import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("firebaseAuthToken");
  const { pathname } = req.nextUrl;

  // Allow access to login page for non-logged-in users
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard route, redirecting unauthenticated users
  if (!isLoggedIn && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to necessary routes
export const config = {
  matcher: ["/dashboard", "/login"],
};
