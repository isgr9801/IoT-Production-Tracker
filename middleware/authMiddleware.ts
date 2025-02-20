import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("authToken");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}










// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const isLoggedIn = req.cookies.get("firebaseAuthToken");
//   const protectedRoutes = ["/dashboard"];

//   if (!isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }
