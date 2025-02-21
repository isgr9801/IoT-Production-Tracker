"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { app } from "../lib/firebase";
import { useRouter } from "next/navigation";

const auth = getAuth(app);

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const token = await user.getIdToken();
        setCookie("firebaseAuthToken", token, { maxAge: 60 * 60 * 24, path: "/" });

        router.replace("/dashboard");
      } else {
        deleteCookie("firebaseAuthToken");
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
