
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { shopProducts, featuredCategories } from '../data/mockData';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products based on search criteria
  const filteredProducts = shopProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' ? true : 
                         product.category.toLowerCase() === category.toLowerCase();
                         
    const matchesPrice = product.price >= priceRange[0] && 
                       product.price <= priceRange[1];
                         
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-pawgreen-100 py-12">
          <div className="paw-container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-pawgreen-600 mb-4">
              Pet Shop
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Quality products for your furry friends. Everything you need to keep them happy and healthy.
            </p>
          </div>
        </section>
        
        {/* Categories Banner */}
        <section className="py-8 bg-white border-b">
          <div className="paw-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCategories.map(category => (
                <div 
                  key={category.id}
                  className="relative rounded-lg overflow-hidden h-32 cursor-pointer"
                  onClick={() => setCategory(category.name.toLowerCase())}
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center text-white transition-all">
                    <h3 className="font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Shop Content */}
        <section className="py-12 bg-pawbg">
          <div className="paw-container">
            {/* Mobile Search and Filter Controls */}
            <div className="md:hidden mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <div className="flex items-center">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filters
                </div>
                <ChevronDown size={16} className={showMobileFilters ? "transform rotate-180" : ""} />
              </Button>
              
              {showMobileFilters && (
                <div className="border rounded-lg p-4 bg-white">
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="category">
                      <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {['All Categories', ...featuredCategories.map(c => c.name)].map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`mobile-${item.toLowerCase().replace(/\s/g, '-')}`} 
                                checked={category === (item === 'All Categories' ? 'all' : item.toLowerCase())}
                                onCheckedChange={() => setCategory(item === 'All Categories' ? 'all' : item.toLowerCase())}
                              />
                              <Label htmlFor={`mobile-${item.toLowerCase().replace(/\s/g, '-')}`}>{item}</Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="price">
                      <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="px-2 py-4">
                          <Slider 
                            defaultValue={[0, 100]} 
                            max={100} 
                            step={1} 
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex justify-between mt-2 text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setCategory('all');
                        setPriceRange([0, 100]);
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      onClick={() => setShowMobileFilters(false)}
                      className="bg-pawgreen-500 hover:bg-pawgreen-600"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters (Desktop) */}
              <div className="hidden md:block w-64 shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        type="text" 
                        placeholder="Search products..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {['All Categories', ...featuredCategories.map(c => c.name)].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.toLowerCase().replace(/\s/g, '-')}
                            checked={category === (item === 'All Categories' ? 'all' : item.toLowerCase())}
                            onCheckedChange={() => setCategory(item === 'All Categories' ? 'all' : item.toLowerCase())}
                          />
                          <Label htmlFor={item.toLowerCase().replace(/\s/g, '-')}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="px-1 py-4">
                      <Slider 
                        defaultValue={[0, 100]} 
                        max={100} 
                        step={1} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setCategory('all');
                      setPriceRange([0, 100]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {filteredProducts.length} Products
                  </h2>
                  
                  <div className="hidden md:flex items-center gap-2">
                    <Filter size={18} className="text-gray-500" />
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-white rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search criteria.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setCategory('all');
                        setPriceRange([0, 100]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
