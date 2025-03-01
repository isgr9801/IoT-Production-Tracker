import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const isLoggedIn = req.cookies.get("firebaseAuthToken");
	const { pathname } = req.nextUrl;

	const publicRoutes = ["/", "/login", "/signup", "/404"];

	if (isLoggedIn && pathname === "/login") {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	if (!isLoggedIn && !publicRoutes.includes(pathname) && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/login"],
};