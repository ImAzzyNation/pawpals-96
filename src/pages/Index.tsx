
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import NavigationMenu from '../components/NavigationMenu';
import PetCard from '../components/PetCard';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { featuredCategories } from '../data/mockData';
import { getLostPets, getAdoptionPets, getProducts } from '../services/dbConnection';
import { Pet, Product } from '../services/dbService';

const Index = () => {
  const [recentLostPets, setRecentLostPets] = useState<Pet[]>([]);
  const [featuredAdoptPets, setFeaturedAdoptPets] = useState<Pet[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch data from our database service
        const [lostPets, adoptPets, products] = await Promise.all([
          getLostPets(),
          getAdoptionPets(),
          getProducts()
        ]);
        
        setRecentLostPets(lostPets.slice(0, 3));
        setFeaturedAdoptPets(adoptPets.slice(0, 3));
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data for homepage:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Navigation Menu */}
        <NavigationMenu />
        
        {/* Lost Pets Section */}
        <section className="py-16 bg-white">
          <div className="paw-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600">Recently Lost Pets</h2>
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500">
                <Link to="/lost">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading pets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentLostPets.length > 0 ? (
                  recentLostPets.map(pet => (
                    <PetCard key={pet.id} {...pet} />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">No lost pets found.</p>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* Adoption Section */}
        <section className="py-16 bg-pawbg">
          <div className="paw-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600">Pets Looking for a Home</h2>
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500">
                <Link to="/adopt">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading pets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAdoptPets.length > 0 ? (
                  featuredAdoptPets.map(pet => (
                    <PetCard key={pet.id} {...pet} />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">No adoption pets found.</p>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="paw-container">
            <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-12">How PawPals Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mb-4 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-pawgreen-500">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Post or Search</h3>
                <p className="text-gray-600">Post about a lost pet or browse our database to find or adopt a pet.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mb-4 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-pawgreen-500">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Connect</h3>
                <p className="text-gray-600">Connect with pet owners or shelters to reunite or adopt pets.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mb-4 rounded-full bg-pawgreen-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-pawgreen-500">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Happy Tails</h3>
                <p className="text-gray-600">Celebrate the joy of reuniting lost pets or finding forever homes.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Shop Section */}
        <section className="py-16 bg-pawbg">
          <div className="paw-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600">Shop for Your Pet</h2>
              <Button asChild variant="outline" className="gap-2 border-pawgreen-500 text-pawgreen-500">
                <Link to="/shop">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            {/* Featured Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {featuredCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/shop/category/${category.id}`} 
                  className="relative rounded-lg overflow-hidden h-40"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 transition-opacity hover:bg-opacity-50">
                    <h3 className="font-semibold text-xl mb-1">{category.name}</h3>
                    <p className="text-sm">{category.count} Products</p>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Featured Products */}
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))
                ) : (
                  <p className="col-span-4 text-center text-gray-500">No products found.</p>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-pawgreen-500 to-pawgreen-600 text-white">
          <div className="paw-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Help a Pet in Need?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Join our community of pet lovers and make a difference in the lives of animals. Sign up today!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-pawgreen-600 hover:bg-gray-100 rounded-full">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-pawgreen-400 rounded-full">
                <Link to="/lost">Report Lost Pet</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
