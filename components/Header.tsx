"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState<string>("USER"); // Explicitly defining string type
  const router = useRouter();

  useEffect(() => {
    // Check theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Listen for authentication state changes
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

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

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
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 dark:bg-gray-700 rounded-lg shadow-md">
        <User size={22} className="text-white" />
        <span className="text-sm font-semibold uppercase text-white">
          {userName}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 p-2"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
