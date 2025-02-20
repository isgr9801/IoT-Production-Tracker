// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "./lib/firebase";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  const path = request.nextUrl.pathname;
  const session = await getToken({ req: request });

  if (!session && path.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};