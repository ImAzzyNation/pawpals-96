
import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-12">
      <div className="paw-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <PawPrint className="h-7 w-7 text-pawgreen-500" strokeWidth={2.5} />
              <span className="text-xl font-bold text-pawgreen-600">PawPals</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting pets and people with love and care since 2023. Our mission is to help every pet find their forever home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-pawgreen-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pawgreen-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pawgreen-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pawgreen-500">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/lost" className="text-gray-600 hover:text-pawgreen-500 text-sm">Lost Pets</Link></li>
              <li><Link to="/adopt" className="text-gray-600 hover:text-pawgreen-500 text-sm">Adopt a Pet</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-pawgreen-500 text-sm">Pet Shop</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-pawgreen-500 text-sm">Post a Pet</Link></li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-pawgreen-500 text-sm">FAQ</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-pawgreen-500 text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-pawgreen-500 text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-pawgreen-500 text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to get updates on new pets and promotions.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-3 py-2 border border-gray-300 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-1 focus:ring-pawgreen-500"
              />
              <button
                type="submit"
                className="bg-pawgreen-500 hover:bg-pawgreen-600 text-white px-4 py-2 rounded-r-md text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PawPals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
