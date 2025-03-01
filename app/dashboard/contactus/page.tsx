"use client";
import { useAuth } from "../../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'


export default function AnalyticsPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		if (user === undefined) return;

		if (!user) {
			router.push("/dashboard");
		} else {
			setAuthChecked(true);
		}
	}, [user, router]);

	if (!authChecked) return <p className="text-center">Loading...</p>;

	return (
		<div>
			<a href="/dashboard" className="text-2xl font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">dashboard</a>
			<> / </>
			<a href="/dashboard/contactus" className="text-2xl font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">contact us</a>
			<p className="text-gray-600 dark:text-gray-300 mt-2">
				Contact Us
			</p>

			<div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4">
				details
			</div>
		</div>
	);
}