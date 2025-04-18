import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PawPrint, Search, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { authService } from "@/services/authService";
import SimpleAvatar from './ui/avatar'; // Using SimpleAvatar

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(authService.getCurrentUser());
    };

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    window.location.href = "/";
  };

  const getUserInitials = () => {
    if (!currentUser) return "";
    const firstInitial = currentUser.first_name?.[0] ?? "";
    const lastInitial = currentUser.last_name?.[0] ?? "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="paw-container py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-pawgreen-500" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-pawgreen-600">PawPals</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/lost" className="text-gray-700 hover:text-pawgreen-500 font-medium">
              Lost Pets
            </Link>
            <Link to="/adopt" className="text-gray-700 hover:text-pawgreen-500 font-medium">
              Adopt
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-pawgreen-500 font-medium">
              Shop
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
              <ShoppingBag size={20} />
            </Button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <SimpleAvatar
                  src="/placeholder.svg"
                  alt="User Avatar"
                  fallback={getUserInitials()}
                />
                <Button variant="ghost" onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50">
                <Link to="/login">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pt-6 border-t mt-4 space-y-5">
            {["lost", "adopt", "shop"].map((path) => (
              <Link
                key={path}
                to={`/${path}`}
                className="block text-gray-700 hover:text-pawgreen-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 items-center">
              <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
                <ShoppingBag size={20} />
              </Button>
              {currentUser ? (
                <>
                  <SimpleAvatar
                    src="/placeholder.svg"
                    alt="User Avatar"
                    fallback={getUserInitials()}
                  />
                  <Link to="/profile" className="text-pawgreen-600 font-medium">
                    Profile
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="text-red-500">
                    <LogOut size={18} />
                    <span className="ml-1">Log out</span>
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50">
                  <Link to="/login">
                    <User size={18} />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
