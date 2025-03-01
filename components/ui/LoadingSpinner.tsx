"use client";

import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black">
			<motion.div
				className="w-16 h-16 border-4 border-transparent border-t-neon border-r-neon rounded-full animate-spin"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
			/>
		</div>
	);
};

export default LoadingSpinner;