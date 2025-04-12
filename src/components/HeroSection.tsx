
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-pawgreen-50 to-pawbg py-16 md:py-24">
      <div className="paw-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-pawgreen-600 leading-tight">
                Find Your Perfect <span className="text-pawgreen-500">Furry</span> Companion
              </h1>
              <p className="text-lg text-gray-700">
                Connecting lost pets with their owners and helping homeless animals find loving families.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-pawgreen-500 hover:bg-pawgreen-600 text-white rounded-full">
                <Link to="/adopt">
                  <Heart size={18} className="mr-2" />
                  Adopt a Pet
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-pawgreen-500 text-pawgreen-500 hover:bg-pawgreen-50 rounded-full">
                <Link to="/lost">
                  <Search size={18} className="mr-2" />
                  Find Lost Pets
                </Link>
              </Button>
            </div>

            <div className="pt-4 flex flex-wrap gap-8 justify-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pawaccent-peach flex items-center justify-center">
                  <Heart size={20} className="text-pawgreen-600" />
                </div>
                <div>
                  <p className="font-medium">1,200+</p>
                  <p className="text-sm text-gray-600">Pets Adopted</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pawaccent-blue flex items-center justify-center">
                  <Search size={20} className="text-pawgreen-600" />
                </div>
                <div>
                  <p className="font-medium">850+</p>
                  <p className="text-sm text-gray-600">Lost Pets Found</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pawaccent-yellow flex items-center justify-center">
                  <ShoppingBag size={20} className="text-pawgreen-600" />
                </div>
                <div>
                  <p className="font-medium">5,000+</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" 
                alt="Dog and cat together"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pawgreen-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pawaccent-peach rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
