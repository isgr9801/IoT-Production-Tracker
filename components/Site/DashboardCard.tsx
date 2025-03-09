import React from "react";

interface DashboardCardProps {
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 border border-gray-200  max-w-sm">
      <div>
        <label htmlFor=""></label>
        <input
          id="email"
          type="email"
          placeholder="USERNAME/EMAIL"
          required
          autoComplete="email"
          className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
        />
          </div>
    </div>
  );
};

export default DashboardCard;