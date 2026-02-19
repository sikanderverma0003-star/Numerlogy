import React, { useState, useEffect } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar = ({ onMenuClick }: TopNavbarProps) => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get user name from localStorage (would be fetched from API in real app)
    const userEmail = localStorage.getItem("userEmail") || "User";
    setUserName(userEmail.split("@")[0]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Menu button - mobile only */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <Menu size={24} className="text-gray-600" />
        </button>

        {/* Spacer */}
        <div className="flex-1 md:flex-none" />

        {/* User section */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-gray-900">
              {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </p>
            <p className="text-sm text-gray-500">{localStorage.getItem("userEmail")}</p>
          </div>

          {/* User avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
