"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard"); // Use replace() instead of push() to avoid history stack issues
    }
  }, [user, router]);

  if (user) return null; // Prevents rendering during redirection

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
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
