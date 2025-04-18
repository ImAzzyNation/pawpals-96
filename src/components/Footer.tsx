import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <PawPrint className="h-7 w-7" strokeWidth={2.5} />
              <span className="text-xl font-bold">PawPals</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting pets and people since 2023. Our mission is to help every pet find a loving home.
            </p>
            <div className="flex gap-4 mt-2">
              {[Facebook, Twitter, Instagram, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-500 hover:text-green-600">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/lost" className="text-gray-600 hover:text-green-600">Lost Pets</Link></li>
              <li><Link to="/adopt" className="text-gray-600 hover:text-green-600">Adopt a Pet</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-green-600">Pet Shop</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-green-600">Post a Pet</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-green-600">FAQ</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-green-600">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-green-600">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe for updates and pet news.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PawPals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
