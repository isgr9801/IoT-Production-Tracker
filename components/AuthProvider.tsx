"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { app } from "../lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "./ui/LoadingSpinner";

const auth = getAuth(app);

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);
			setLoading(false);

			if (user) {
				const token = await user.getIdToken();
				setCookie("firebaseAuthToken", token, { maxAge: 60 * 60 * 24, path: "/" });

				if (pathname === "/login") {
					router.replace("/dashboard");
				}
			} else {
				deleteCookie("firebaseAuthToken");

				const protectedRoutes = ["/dashboard", "/dashboard/analytics", "/dashboard/products","/dashboard/contactus"];
				if (protectedRoutes.includes(pathname)) {
					router.replace("/login");
				}
			}
		});

		return () => unsubscribe();
	}, [router, pathname]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
