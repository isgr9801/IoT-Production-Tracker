"use client";
import DashboardCard from "../../components/Site/DashboardCard";

export default function DashboardPage() {
	return (
		<div>
			<a href="/dashboard" className="text-base font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">dashboard</a>
			<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6">
				<h2 className="text-4xl font-extrabold self-center">
					<p className="text-gray-600 dark:text-gray-300 mt-2 ">WELCOME !</p>
				</h2>
				<h1 className="text-2xl font-bold bg-white dark:bg-gray-900 justify-center text-justify text-black dark:text-white ">
					<p className="text-gray-600 dark:text-gray-300 mt-4">
						An ordinary not so ordinary place for you and your IOT production
					</p>
				</h1>
				<DashboardCard />
			</div>
		</div>
	);
}