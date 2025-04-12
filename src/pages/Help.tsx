
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MessageCircle, FileQuestion, Users, BookOpen } from 'lucide-react';

const Help = () => {
  const helpResources = [
    {
      icon: <MessageCircle className="h-10 w-10 text-pawgreen-500" />,
      title: "Community Forum",
      description: "Connect with other pet owners to share experiences and get advice from our community."
    },
    {
      icon: <FileQuestion className="h-10 w-10 text-pawgreen-500" />,
      title: "FAQs",
      description: "Find answers to commonly asked questions about pet care, adoption, and more."
    },
    {
      icon: <Users className="h-10 w-10 text-pawgreen-500" />,
      title: "Expert Advice",
      description: "Get professional advice from veterinarians and animal behavior specialists."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-pawgreen-500" />,
      title: "Pet Care Guides",
      description: "Access comprehensive guides on caring for different types of pets."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pawgreen-500 to-pawgreen-600 py-20 text-white">
          <div className="paw-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Online Help Center</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Access expert advice and support from our community of pet lovers
            </p>
          </div>
        </section>
        
        {/* Help Resources */}
        <section className="py-16 bg-white">
          <div className="paw-container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-pawgreen-600 mb-12">Help Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpResources.map((resource, index) => (
                <div key={index} className="bg-pawbg p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center">
                  <div className="mx-auto flex items-center justify-center mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-semibold text-pawgreen-600 mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Coming Soon */}
        <section className="py-16 bg-pawbg">
          <div className="paw-container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 mb-4">Forum Coming Soon</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Our community forum is currently under development. Check back soon to connect with other pet owners!
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
