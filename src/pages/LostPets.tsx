
import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PetCard from '../components/PetCard';
import { lostPets } from '../data/mockData';

const LostPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('all');
  const [location, setLocation] = useState('');

  // Filter pets based on search criteria
  const filteredPets = lostPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = petType === 'all' ? true : 
                    (petType === 'dog' && pet.breed.toLowerCase().includes('dog')) ||
                    (petType === 'cat' && pet.breed.toLowerCase().includes('cat'));
                    
    const matchesLocation = location === '' ? true : 
                         pet.location.toLowerCase().includes(location.toLowerCase());
                         
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-pawgreen-100 py-12">
          <div className="paw-container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-pawgreen-600 mb-4">
              Lost Pets
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Help reunite these lost pets with their families. If you've seen any of these animals, please contact their owners.
            </p>
            
            {/* Post Lost Pet Button */}
            <Button asChild className="bg-pawgreen-500 hover:bg-pawgreen-600 rounded-full">
              <a href="/post-lost-pet">
                Report a Lost Pet
              </a>
            </Button>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="paw-container">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              {/* Search Input */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search by name or breed..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Pet Type Filter */}
              <div className="w-full md:w-48">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Pet Type
                </label>
                <Select value={petType} onValueChange={setPetType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location Filter */}
              <div className="w-full md:w-64">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="City, State or ZIP..." 
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <Button 
                variant="outline" 
                className="border-pawgreen-500 text-pawgreen-500"
                onClick={() => {
                  setSearchTerm('');
                  setPetType('all');
                  setLocation('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </section>
        
        {/* Pets Listing Section */}
        <section className="py-12 bg-pawbg">
          <div className="paw-container">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredPets.length} pets found
              </h2>
              
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="az">Name: A to Z</SelectItem>
                    <SelectItem value="za">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map(pet => (
                  <PetCard key={pet.id} {...pet} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No pets found</h3>
                <p className="text-gray-500">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-white">
          <div className="paw-container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 mb-4">
              Lost a Pet?
            </h2>
            <p className="text-gray-700 mb-6">
              If you've lost your pet, report it on our platform to increase your chances of finding them. 
              We'll help spread the word in our community of pet lovers.
            </p>
            <Button asChild className="bg-pawgreen-500 hover:bg-pawgreen-600">
              <a href="/post-lost-pet">
                Report Your Lost Pet
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostPets;
