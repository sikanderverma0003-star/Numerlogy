import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: History, label: "History", href: "/dashboard/history" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      {/* Close button for mobile */}
      <div className="flex justify-between items-center mb-8 md:hidden">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Numerology
        </h1>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Logo - desktop only */}
      <div className="hidden md:block mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Numerology
        </h1>
        <p className="text-sm text-gray-500 mt-1">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
      >
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
