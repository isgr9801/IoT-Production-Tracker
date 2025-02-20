"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, BarChart2, Package, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { icon: <BarChart2 size={22} />, path: "/analytics", label: "Analytics" },
    { icon: <Package size={22} />, path: "/products", label: "Products" },
    { icon: <Users size={22} />, path: "/customers", label: "Customers" },
    { icon: <Settings size={22} />, path: "/settings", label: "Settings" },
  ];

  return (
    <aside
      className={`h-screen ${expanded ? "w-48" : "w-16"} bg-gray-900 text-white flex flex-col items-center py-4 gap-6 transition-all duration-300`}
    >
      {/* Menu Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-3 rounded-lg hover:bg-gray-800"
      >
        <Menu size={22} />
      </button>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 w-full"
        >
          {item.icon}
          {expanded && <span className="text-sm">{item.label}</span>}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;