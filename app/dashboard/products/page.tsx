"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { reauthenticateWithCredential, EmailAuthProvider, } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function ProductsPage() {
	const { user } = useAuth();
	const router = useRouter();

	const [productCount, setProductCount] = useState("");
	const [showInfoCard, setShowInfoCard] = useState(false);
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProductCount(e.target.value);
	};

	const handleStartClick = () => {
		const count = Number(productCount);
		if (count < 1 || count > 20) {
			setShowInfoCard(true);
			return;
		}
		setShowInfoCard(false);
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

		try {
			const credential = EmailAuthProvider.credential(user.email!, password);
			await reauthenticateWithCredential(auth.currentUser!, credential);

			setIsModalOpen(false);
			setIsLoading(true);

			setTimeout(() => {
				setIsLoading(false);
				if (authAction === "start") {
					setSuccessMessage(`Production started with ${productCount} count.`);
				} else if (authAction === "stop") {
					setSuccessMessage("Production stopped.");
				}
				setIsSuccessModalOpen(true);

				setTimeout(() => {
					setIsSuccessModalOpen(false);
				}, 5000);
			}, 1500);
		} catch (err) {
			setError("Authentication failed. Please check your password.");
		}
	};

	if (!authChecked) {
		return <p className="text-center mt-6">Loading user data...</p>;
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6">
			<h2 className="text-2xl font-semibold">Product Control Dashboard</h2>
			<p className="text-gray-600 dark:text-gray-300 mt-2">
				To start/stop production re-authenticate yourself to perform desired action.
			</p>

			<div className="flex flex-col md:flex-row gap-6 mt-6">
				{/* start production card */}
				<div className="w-full md:w-1/2 lg:max-w-lg p-4 bg-gray-100 dark:bg-gray-800 shadow rounded-lg">
					<h3 className="text-lg font-semibold">Start Production</h3>
					<input
						type="number"
						value={productCount}
						onChange={handleInputChange}
						placeholder="Enter count (1 - 20)"
						className="mt-2 block w-full rounded-md px-3 py-2 text-gray-900 
                      dark:text-white bg-white dark:bg-gray-700 
                      outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					{showInfoCard && (
						<div className="bg-blue-100 text-center dark:bg-blue-900 p-3 rounded mt-3 text-blue-800 dark:text-blue-200">
							<h4 className="text-bold text-red-600">
								Please enter a valid count of production!!<br />
								Allowed range is : <b>"1 to 20"</b>
							</h4>
							Check with admin.
						</div>
					)}
					<div className="flex justify-center mt-6">
						<button
							onClick={handleStartClick}
							className="mt-6 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full transition transform hover:scale-105"
						>
							Start
						</button>
					</div>
				</div>

				{/* stop prod card */}
				<div className="w-full md:w-1/2 lg:max-w-lg p-4 bg-red-100 dark:bg-red-200 shadow rounded-lg">
					<h3 className="text-lg font-semibold text-red-600">Stop Production</h3>
					<div className="flex justify-center mt-6">
						<button
							onClick={handleStopClick}
							className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition transform hover:scale-105"
						>
							Stop
						</button>
					</div>
				</div>
			</div>

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
							/>
							<button
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
							>
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
						{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
						<div className="flex justify-end mt-4 space-x-2">
							<button onClick={() => setIsModalOpen(false)} className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded">
								Cancel
							</button>
							<button onClick={handleReauth} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}

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