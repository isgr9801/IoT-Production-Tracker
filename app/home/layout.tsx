"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}


// import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Dashboard - Next.js App',
//   description: 'Dashboard page for the Next.js application',
// }

// export default function HomeLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {children}
//     </div>
//   )
// }