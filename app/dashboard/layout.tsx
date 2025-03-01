"use client";
import { AuthProvider } from "../../components/AuthProvider";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-white dark:bg-gray-900 text-black dark:text-white">
				<AuthProvider>
					<div className="flex h-screen min-h-screen">
						<Sidebar />
						<div className="flex-1 flex flex-col">
							<Header />
							<main className="p-4 sm:p-6 overflow-auto">{children}</main>
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}