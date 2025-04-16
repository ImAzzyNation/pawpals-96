import React from 'react';
import { useParams } from 'react-router-dom';
import { featuredCategories } from '../data/categories';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PetCard from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, MapPin } from 'lucide-react';

// Sample adoption pets data
const adoptionPets = [
  {
    id: 'adopt-1',
    name: 'Max',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Golden Retriever',
    age: '2 years',
    location: 'Seattle, WA',
    type: 'adopt' as const,
  },
  {
    id: 'adopt-2',
    name: 'Luna',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Domestic Shorthair',
    age: '1 year',
    location: 'Portland, OR',
    type: 'adopt' as const,
  },
  {
    id: 'adopt-3',
    name: 'Charlie',
    image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Labrador Mix',
    age: '4 years',
    location: 'Vancouver, BC',
    type: 'adopt' as const,
  },
  {
    id: 'adopt-4',
    name: 'Bella',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Beagle',
    age: '3 years',
    location: 'Seattle, WA',
    type: 'adopt' as const,
  },
  {
    id: 'adopt-5',
    name: 'Oliver',
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Siamese Cat',
    age: '2 years',
    location: 'Bellevue, WA',
    type: 'adopt' as const,
  },
  {
    id: 'adopt-6',
    name: 'Daisy',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    breed: 'Calico Cat',
    age: '5 years',
    location: 'Tacoma, WA',
    type: 'adopt' as const,
  },
];

const Adopt = () => {
  const { category } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-pawgreen-100 py-12">
          <div className="paw-container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-pawgreen-600 mb-4">
              Adopt a Pet
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Find your perfect companion. Browse pets from shelters and rescues that need a loving home.
            </p>
          </div>
        </section>
        
        {/* Pet Categories */}
        <section className="py-8 bg-white border-b">
          <div className="paw-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                className={`relative rounded-lg overflow-hidden h-32 cursor-pointer ${!category ? 'ring-2 ring-pawgreen-500' : ''}`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="All Pets" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center text-white transition-all">
                  <h3 className="font-medium text-lg">All Pets</h3>
                </div>
              </div>
              
              <div 
                className={`relative rounded-lg overflow-hidden h-32 cursor-pointer ${category === 'dogs' ? 'ring-2 ring-pawgreen-500' : ''}`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Dogs" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center text-white transition-all">
                  <h3 className="font-medium text-lg">Dogs</h3>
                </div>
              </div>
              
              <div 
                className={`relative rounded-lg overflow-hidden h-32 cursor-pointer ${category === 'cats' ? 'ring-2 ring-pawgreen-500' : ''}`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Cats" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center text-white transition-all">
                  <h3 className="font-medium text-lg">Cats</h3>
                </div>
              </div>
              
              <div 
                className={`relative rounded-lg overflow-hidden h-32 cursor-pointer ${category === 'other' ? 'ring-2 ring-pawgreen-500' : ''}`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Other Pets" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center text-white transition-all">
                  <h3 className="font-medium text-lg">Other Pets</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Adoption Listings */}
        <section className="py-12 bg-pawbg">
          <div className="paw-container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        type="text" 
                        placeholder="Search pets..." 
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        type="text" 
                        placeholder="City, State or ZIP" 
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Pet Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-pets" />
                        <Label htmlFor="all-pets">All Pets</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dogs" />
                        <Label htmlFor="dogs">Dogs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cats" />
                        <Label htmlFor="cats">Cats</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="other-pets" />
                        <Label htmlFor="other-pets">Other Pets</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Age</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="baby" />
                        <Label htmlFor="baby">Baby</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="young" />
                        <Label htmlFor="young">Young</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="adult" />
                        <Label htmlFor="adult">Adult</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="senior" />
                        <Label htmlFor="senior">Senior</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              {/* Pets Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {adoptionPets.length} Pets Available
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-500" />
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="name-asc">Name: A-Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adoptionPets.map(pet => (
                    <PetCard key={pet.id} {...pet} />
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mr-2">Previous</Button>
                  <Button className="bg-pawgreen-500 hover:bg-pawgreen-600">Next</Button>
                </div>
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
