import React from "react";

interface DashboardCardProps {
	children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children }) => {
	return (
		<div className="w-full bg-white shadow-md rounded-lg p-6 border border-gray-200  max-w-sm">
			<div>

			</div>
		</div>
	);
};

export default DashboardCard;