
import React, { useState } from 'react';
import { Search, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PetCard from '../components/PetCard';
import { adoptionPets } from '../data/mockData';

const Adopt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('all');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter pets based on search criteria
  const filteredPets = adoptionPets.filter(pet => {
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
        <section className="relative overflow-hidden bg-gradient-to-b from-pawgreen-200 to-pawbg py-12 md:py-20">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-pawgreen-100 rounded-full opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pawgreen-100 rounded-full opacity-70"></div>
          
          <div className="paw-container text-center relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-pawgreen-600 mb-4">
              Adopt a Pet
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Give a loving home to a pet in need. Browse our available pets and find your perfect companion.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-md max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search by name, breed, etc..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-pawgreen-500 hover:bg-pawgreen-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                </Button>
              </div>
              
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
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
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        type="text" 
                        placeholder="City, State..." 
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Age
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any age</SelectItem>
                        <SelectItem value="baby">Baby</SelectItem>
                        <SelectItem value="young">Young</SelectItem>
                        <SelectItem value="adult">Adult</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <div className="font-medium text-sm text-gray-700 mb-1">Characteristics</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Good with kids", "Good with other pets", "House trained", "Special needs"].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox id={item.toLowerCase().replace(/\s/g, '-')} />
                          <Label htmlFor={item.toLowerCase().replace(/\s/g, '-')}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setPetType('all');
                        setLocation('');
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      className="bg-pawgreen-500 hover:bg-pawgreen-600"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Pets Listing Section */}
        <section className="py-12 bg-pawbg">
          <div className="paw-container">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredPets.length} pets available for adoption
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
        
        {/* Adoption Process */}
        <section className="py-12 bg-white">
          <div className="paw-container">
            <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-12">
              Adoption Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pawgreen-500">1</span>
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-pawgreen-100"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Find a Pet</h3>
                <p className="text-gray-600 text-sm">Browse our listings and find a pet that matches your lifestyle.</p>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pawgreen-500">2</span>
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-pawgreen-100"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Apply</h3>
                <p className="text-gray-600 text-sm">Submit an adoption application for your chosen pet.</p>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pawgreen-500">3</span>
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-pawgreen-100"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Meet & Greet</h3>
                <p className="text-gray-600 text-sm">Schedule a meet and greet to ensure you and your new pet are a perfect match.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pawgreen-500">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Welcome Home</h3>
                <p className="text-gray-600 text-sm">Complete the adoption process and welcome your new family member home.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Adopt;
