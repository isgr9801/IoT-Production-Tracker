// components/Navbar.tsx
"use client";

import { useState } from "react";
import { ArrowRightOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <nav
      className={`h-screen bg-gray-800 text-white fixed left-0 top-0 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <UserCircleIcon className="h-8 w-8" />
          {isExpanded && <span className="text-xl font-bold">Dashboard</span>}
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full p-2 hover:bg-gray-700 rounded"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { Home, Settings, User, LogOut, ChartBar, Mail } from 'lucide-react'
// import { twMerge } from 'tailwind-merge'
// import { useAuth } from '@/context/AuthContext'
// import { auth } from '@/lib/firebase'
// import { signOut } from 'firebase/auth'
// import { useRouter } from 'next/navigation'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isHovered, setIsHovered] = useState(false)
//   const { user } = useAuth()
//   const router = useRouter()

//   const toggleNavbar = () => setIsOpen(!isOpen)

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       router.push('/')
//     } catch (error) {
//       console.error('Logout error:', error)
//     }
//   }

//   return (
//     <nav
//       className={twMerge(
//         'fixed h-screen bg-gray-800 text-white transition-all duration-300 z-10',
//         isOpen || isHovered ? 'w-64' : 'w-16'
//       )}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="p-4 flex flex-col h-full">
//         <div className="flex-1">
//           <button 
//             onClick={toggleNavbar} 
//             className="text-white mb-8 hover:bg-gray-700 p-2 rounded"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>

//           {/* User Profile */}
//           {user && (
//             <div className="flex items-center space-x-3 mb-8 px-2 py-3 bg-gray-700 rounded">
//               <User className="w-6 h-6 min-w-[24px]" />
//               {(isOpen || isHovered) && (
//                 <div>
//                   <p className="text-sm font-medium">{user.displayName || 'Anonymous'}</p>
//                   <p className="text-xs text-gray-300">{user.email}</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Navigation Items */}
//           <div className="space-y-2">
//             <NavLink href="/home" icon={<Home />} text="Dashboard" expanded={isOpen || isHovered} />
//             <NavLink href="/home/stats" icon={<ChartBar />} text="Statistics" expanded={isOpen || isHovered} />
//             <NavLink href="/home/messages" icon={<Mail />} text="Messages" expanded={isOpen || isHovered} />
//             <NavLink href="/home/settings" icon={<Settings />} text="Settings" expanded={isOpen || isHovered} />
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded mt-auto"
//         >
//           <LogOut className="w-5 h-5" />
//           {(isOpen || isHovered) && <span>Logout</span>}
//         </button>
//       </div>
//     </nav>
//   )
// }

// function NavLink({ href, icon, text, expanded }: { 
//   href: string
//   icon: React.ReactNode
//   text: string
//   expanded: boolean
// }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
//     >
//       {icon}
//       {expanded && <span>{text}</span>}
//     </Link>
//   )
// }