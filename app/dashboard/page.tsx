"use client";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ThemeToggle from "../../components/ThemeToggle";
import Header from "../../components/Header";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Sidebar />  
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Your latest stats and reports will be displayed here.</p>
        </main>
      </div>
    </div>
  );
}