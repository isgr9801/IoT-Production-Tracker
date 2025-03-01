"use client";
import DashboardCard from "../../components/Site/DashboardCard";

export default function DashboardPage() {
	return (
		<div>

			<a href="/dashboard" className="text-2xl font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">Dashboard</a>
			<p className="text-gray-600 dark:text-gray-300 mt-2">
				home /dashboard
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
				<DashboardCard />
				<DashboardCard />
				<DashboardCard />
			</div>
		</div>
	);
}