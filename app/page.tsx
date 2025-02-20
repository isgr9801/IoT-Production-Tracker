"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // Redirects instantly without a UI flash
  }, [router]);

  return null; // No UI is rendered, it just redirects
}
