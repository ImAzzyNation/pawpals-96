
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dog, AlertTriangle, HelpCircle, ShoppingCart } from 'lucide-react';

const NavigationMenu = () => {
  const menuItems = [
    {
      icon: <Home className="w-12 h-12 text-pawgreen-600" />,
      title: "Housing",
      description: "Find a safe and comfortable housing for your pet while you're away.",
      link: "/housing"
    },
    {
      icon: <Dog className="w-12 h-12 text-pawgreen-600" />,
      title: "Adoption",
      description: "Browse pets looking for a loving home and start the adoption process today.",
      link: "/adopt"
    },
    {
      icon: <AlertTriangle className="w-12 h-12 text-pawgreen-600" />,
      title: "Reports",
      description: "Report lost pets, abuse, or other urgent matters to help keep animals safe.",
      link: "/lost"
    },
    {
      icon: <HelpCircle className="w-12 h-12 text-pawgreen-600" />,
      title: "Online Help",
      description: "Access expert advice and support from other pet lovers in our forum.",
      link: "/help"
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-pawgreen-600" />,
      title: "Pet Supplies",
      description: "Shop for food, toys, and other essential supplies for your pets.",
      link: "/shop"
    }
  ];

  return (
    <div className="py-16 bg-pawbg">
      <div className="paw-container">
        <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Background image of a dog in the center for larger screens */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <img 
              src="/lovable-uploads/40deaa53-36ca-4315-b5e3-dabb9f9742b3.png" 
              alt="Dog" 
              className="max-h-[400px] opacity-90"
            />
          </div>
          
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.link}
              className={`
                bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all z-10
                flex flex-col items-center md:items-start gap-2
                hover:bg-pawgreen-50 hover:-translate-y-1 duration-300
                ${index === 4 ? 'md:col-span-2 md:mx-auto md:max-w-md' : ''}
              `}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-pawgreen-600">{item.title}</h3>
              <p className="text-gray-600 text-center md:text-left">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
