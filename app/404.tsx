"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          router.push("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Work in Progress...</p>
      <p className="mt-2 text-gray-500">Redirecting to home in {countdown} seconds...</p>
    </div>
  );
};

export default NotFoundPage;
