"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function HomePage() {
	const { user } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (user) {
			router.replace("/dashboard");
		}
		setIsLoading(false);
	}, [user, router]);

	if (isLoading) return null;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
			{/* toggle*/}
			<div className="absolute top-4 right-4">
				{mounted && (
					<button
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
					>
						{theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
					</button>
				)}
			</div>

			<h1 className="text-4xl font-bold mb-6">Welcome!</h1>
			<p className="text-lg mb-4 text-center">Sign in to access web interface to handle production <br />device and get instant live reports...</p>
			<button
				onClick={() => router.push("/login")}
				className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
			>
				Login / SignIn
			</button>
		</div>
	);
}