"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.replace("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center w-full max-w-sm bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        /> */}
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <form onSubmit={handleLogin} className="w-full space-y-6 mt-6">
          <div>
            <input
              id="email"
              type="email"
              placeholder="USERNAME/EMAIL"
              required
              autoComplete="email"
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                required
                autoComplete="current-password"
                className="block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Contact us.</a>
        </p>
      </div>
    </div>
  );
}