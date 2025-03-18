"use client";
import DashboardCard from "../../components/Site/DashboardCard";

export default function DashboardPage() {
	return (
		<div>
			<a href="/dashboard" className="text-base font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">dashboard</a>
		
			<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6">
		<h2 className="text-2xl font-semibold">
            <p className="text-gray-600 dark:text-gray-300 mt-2">Production Analytics Dashboard</p>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
        Production operation/failure statics for analysis.
        </p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
				<DashboardCard />
				<DashboardCard />
				<DashboardCard />
			</div>
			</div>
		</div>
	);
}