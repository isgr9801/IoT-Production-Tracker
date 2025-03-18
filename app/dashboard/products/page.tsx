"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { reauthenticateWithCredential, EmailAuthProvider, getIdToken } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function ProductsPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [productCount, setProductCount] = useState<number | "">("")
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [authAction, setAuthAction] = useState<"start" | "stop" | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		if (user === undefined) return;
		if (!user) {
			router.push("/login");
		} else {
			setAuthChecked(true);
		}
	}, [user, router]);

	const handleStartClick = () => {
		setAuthAction("start");
		setIsModalOpen(true);
		setPassword("");
		setShowPassword(false);
		setError("");
	};

	const handleStopClick = () => {
		setAuthAction("stop");
		setIsModalOpen(true);
		setPassword("");
		setShowPassword(false);
		setError("");
	};

	const handleReauth = async () => {
		if (!user) return;
		setError("");
		setIsLoading(true);

		try {
			const credential = EmailAuthProvider.credential(user.email!, password);
			await reauthenticateWithCredential(auth.currentUser!, credential);

			const idToken = await getIdToken(auth.currentUser!, true);

			const productionData: Record<string, any> = {
				userId: user.uid,
				userEmail: user.email,
				idToken,
				action: authAction,
				timestamp: new Date().toISOString(),
			};

			if (authAction === "start") {
				productionData.productCount = Number(productCount); // Include count for start
			} else if (authAction === "stop") {
				productionData.productCount = "N/A"; // Store "N/A" instead of 0
			}

			const response = await fetch("/api/insertProdData", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(productionData),
			});

			const result = await response.json();

			if (response.ok && result.success) {
				setIsLoading(false);
				setIsModalOpen(false);

				setSuccessMessage(authAction === "start"
					? `Production started with ${productCount} count.`
					: "Production stopped.");

				setIsSuccessModalOpen(true);

				setTimeout(() => {
					setIsSuccessModalOpen(false);
				}, 5000);
			} else {
				throw new Error(result.message || "Failed to insert data.");
			}
		} catch (err) {
			setIsLoading(false);
			setError("Authentication failed or data insertion error. Please try again.");
		}
	};


	if (!authChecked) {
		return <p className="text-center mt-6">Loading user data...</p>;
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6">
			<h2 className="text-2xl font-semibold">Product Control Dashboard</h2>
			<p className="text-gray-600 dark:text-gray-300 mt-2">
				To start/stop production, re-authenticate yourself to perform the desired action.
			</p>

			<div className="flex flex-col md:flex-row gap-6 mt-6">
				<div className="w-full md:w-1/2 lg:max-w-lg p-4 bg-gray-100 dark:bg-gray-800 shadow rounded-lg">
					<h3 className="text-lg font-semibold">Start Production</h3>
					<input
						type="number"
						value={productCount}
						onChange={(e) => {
							const value = Number(e.target.value);
							if (value >= 1 && value <= 30) {
								setProductCount(value);
							}
						}}
						placeholder="Enter count within specific range (1 - 30)"
						min="1"
						max="30"
						className="mt-2 block w-full rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<div className="flex justify-center mt-6">
						<button
							onClick={handleStartClick}
							className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full transition transform hover:scale-105"
						>
							Start
						</button>
					</div>
				</div>

				<div className="w-full md:w-1/2 lg:max-w-lg p-4 bg-red-100 dark:bg-red-200 shadow rounded-lg">
					<h3 className="text-lg font-semibold text-red-600">Stop Production</h3>
					<div className="flex justify-center mt-6">
						<button
							onClick={handleStopClick}
							className="mt-12 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition transform hover:scale-105"
						>
							Stop
						</button>
					</div>
				</div>
			</div>

			{/* Reauthentication Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
						<h3 className="text-lg font-semibold">Re-authenticate</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
							Enter your password to continue.
						</p>
						<div className="mt-2 relative">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter password"
								className="block w-full rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
								disabled={isLoading}
							/>
							<button
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
								disabled={isLoading}
							>
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>

						{error && <p className="text-red-500 mt-2">{error}</p>}

						<div className="flex justify-end mt-4 space-x-4">
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-400 text-white px-4 py-2 rounded-md"
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								onClick={handleReauth}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
								disabled={isLoading}
							>
								{isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ✅ Success Modal */}
			{isSuccessModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
						<p className="text-lg font-semibold">{successMessage}</p>
						<button onClick={() => setIsSuccessModalOpen(false)} className="mt-4 bg-gray-400 px-4 py-2 rounded">
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
}