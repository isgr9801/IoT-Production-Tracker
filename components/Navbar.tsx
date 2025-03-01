"use client";
import { useState } from "react";
import { ArrowRightOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const [isExpanded, setIsExpanded] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		await auth.signOut();
		router.push("/");
	};

	return (
		<nav
			className={`h-screen bg-gray-800 dark:bg-gray-900 text-white fixed left-0 top-0 transition-all ${isExpanded ? "w-64" : "w-20"
				}`}
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			<div className="p-4">
				<div className="flex items-center space-x-2 mb-8">
					<UserCircleIcon className="h-8 w-8" />
					{isExpanded && <span className="text-xl font-bold">Dashboard</span>}
				</div>

				<div className="mt-4">
					<button
						onClick={handleLogout}
						className="flex items-center space-x-2 w-full p-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded"
					>
						<ArrowRightOnRectangleIcon className="h-6 w-6" />
						{isExpanded && <span>Logout</span>}
					</button>
				</div>
			</div>
		</nav>
	);
}