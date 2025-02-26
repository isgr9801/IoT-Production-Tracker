"use client";

import { LogOut, User } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [userName, setUserName] = useState<string>("USER");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName?.toUpperCase() || user.email?.split("@")[0].toUpperCase() || "USER";
        setUserName(name);
      } else {
        setUserName("USER");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 dark:bg-gray-700 rounded-lg shadow-md">
        <User size={22} className="text-white" />
        <span className="text-sm font-semibold uppercase text-white">{userName}</span>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button onClick={handleLogout} className="text-red-500 hover:text-red-600 p-2">
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
};
export default Header;
