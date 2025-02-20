import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="ml-20 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

// 'use client'

// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import Navbar from '@/components/Navbar'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { user, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/')
//     }
//   }, [user, loading, router])

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="flex flex-1">
//         <Navbar />
//         <main className="flex-1 p-8 ml-16 overflow-y-auto">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   )
// }