"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
    setIsLoading(false);
  }, [user, router]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
      <p className="text-lg mb-4">Sign in to access your dashboard.</p>
      <button
        onClick={() => router.push("/login")}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Login / Signup
      </button>
    </div>
  );
}
