"use client";
import DashboardCard from "../../components/Site/DashboardCard";
import { FaPlay, FaStop, FaChartLine, FaPlug } from 'react-icons/fa';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="p-4 sm:p-6">
                {/* Breadcrumb */}
                <a href="/dashboard" className="text-base font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">
                    dashboard
                </a>

                {/* Welcome Section */}
                <div className="mt-4">
                    <h2 className="text-4xl font-extrabold self-center">
                        <p className="text-gray-600 dark:text-gray-300">WELCOME !</p>
                    </h2>
                                    {/* Features Section */}
                <div className="mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1: Start Production */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                            <div className="flex items-center mb-3">
                                <FaPlay className="text-blue-500 dark:text-blue-400 mr-3 text-xl" />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Start Production
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Send a production request to PLC to start manufacturing process
                            </p>
                        </div>

                        {/* Feature 2: Emergency Stop */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500">
                            <div className="flex items-center mb-3">
                                <FaStop className="text-red-500 dark:text-red-400 mr-3 text-xl" />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Emergency Stop
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Immediately halt all production activities in case of emergency
                            </p>
                        </div>

                        {/* Feature 3: Live Statistics */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                            <div className="flex items-center mb-3">
                                <FaPlug className="text-green-500 dark:text-green-400 mr-3 text-xl" />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Live Statistics
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Real-time production data (requires active ESP connection)
                            </p>
                        </div>

                        {/* Feature 4: Production Analytics */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                            <div className="flex items-center mb-3">
                                <FaChartLine className="text-purple-500 dark:text-purple-400 mr-3 text-xl" />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Production Analytics
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Historical graphs and records of overall production statistics
                            </p>
                        </div>
                    </div>
                </div>
                    <h1 className="text-2xl font-bold justify-center text-justify">
                        <p className="text-gray-600 dark:text-gray-300 mt-8">
                            An ordinary not so ordinary place for you and your IOT production
                        </p>
                    </h1>
                </div>

                {/* Dashboard Card */}
                <DashboardCard />
            </div>
        </div>
    );
}