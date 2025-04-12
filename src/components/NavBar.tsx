
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  PawPrint, 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { authService } from '@/services/dbService';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  
  // Update current user when auth state changes
  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);
  
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    // Force a reload to ensure all user state is cleared
    window.location.href = '/';
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!currentUser) return '';
    const firstInitial = currentUser.firstName ? currentUser.firstName[0] : '';
    const lastInitial = currentUser.lastName ? currentUser.lastName[0] : '';
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
          
          {/* Desktop Navigation */}
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
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
              <ShoppingBag size={20} />
            </Button>
            
            {/* Show avatar dropdown if logged in, otherwise show login button */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                      <AvatarFallback className="bg-pawgreen-100 text-pawgreen-800">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50">
                <Link to="/login">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pt-6 border-t mt-4 space-y-5">
            <Link 
              to="/lost" 
              className="block text-gray-700 hover:text-pawgreen-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Lost Pets
            </Link>
            <Link 
              to="/adopt" 
              className="block text-gray-700 hover:text-pawgreen-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Adopt
            </Link>
            <Link 
              to="/shop" 
              className="block text-gray-700 hover:text-pawgreen-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <div className="flex gap-4 pt-2">
              <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-700">
                <ShoppingBag size={20} />
              </Button>
              
              {/* Mobile Login/Avatar */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                    <AvatarFallback className="bg-pawgreen-100 text-pawgreen-800">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" onClick={handleLogout} className="text-red-500">
                    <LogOut size={18} />
                    <span className="ml-1">Log out</span>
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
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
