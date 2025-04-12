
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  PawPrint, 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X
} from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50">
              <Link to="/login">
                <User size={18} />
                <span>Login</span>
              </Link>
            </Button>
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
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50">
                <Link to="/login">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
