
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dog, AlertTriangle, HelpCircle, ShoppingCart } from 'lucide-react';

const NavigationMenu = () => {
  const menuItems = [
    {
      icon: <Home className="w-10 h-10 text-pawgreen-600" />,
      title: "Housing",
      description: "Find a safe and comfortable housing for your pet while you're away.",
      link: "/housing",
      position: "left-top"
    },
    {
      icon: <Dog className="w-10 h-10 text-pawgreen-600" />,
      title: "Adoption",
      description: "Browse pets looking for a loving home and start the adoption process today.",
      link: "/adopt",
      position: "left-bottom"
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-pawgreen-600" />,
      title: "Reports",
      description: "Report lost pets, abuse, or other urgent matters to help keep animals safe.",
      link: "/lost",
      position: "right-top"
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-pawgreen-600" />,
      title: "Online Help",
      description: "Access expert advice and support from other pet lovers in our forum.",
      link: "/help",
      position: "right-bottom"
    },
    {
      icon: <ShoppingCart className="w-10 h-10 text-pawgreen-600" />,
      title: "Pet Supplies",
      description: "Shop for food, toys, and other essential supplies for your pets.",
      link: "/shop",
      position: "bottom"
    }
  ];

  return (
    <div className="py-16 bg-pawbg relative">
      <div className="paw-container">
        <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-12">Our Services</h2>
        
        {/* Central dog image with absolute positioning */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-5xl">
            {/* Central dog image */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-xs mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Cute Golden Retriever" 
                className="w-full rounded-full border-4 border-pawgreen-500 shadow-lg"
              />
            </div>
            
            {/* Circular layout for menu items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ minHeight: "600px" }}>
              {menuItems.map((item, index) => {
                // Determine positioning class based on the position property
                let positionClass = "";
                switch(item.position) {
                  case "left-top":
                    positionClass = "md:col-start-1 md:row-start-1";
                    break;
                  case "left-bottom":
                    positionClass = "md:col-start-1 md:row-start-2";
                    break;
                  case "right-top":
                    positionClass = "md:col-start-3 md:row-start-1";
                    break;
                  case "right-bottom":
                    positionClass = "md:col-start-3 md:row-start-2";
                    break;
                  case "bottom":
                    positionClass = "md:col-start-2 md:row-start-3";
                    break;
                  default:
                    positionClass = "";
                }
                
                return (
                  <Link 
                    key={index}
                    to={item.link}
                    className={`
                      bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all z-20
                      flex flex-col items-center md:items-start gap-2
                      hover:bg-pawgreen-50 hover:-translate-y-1 duration-300
                      ${positionClass}
                    `}
                  >
                    <div className="mb-2">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-pawgreen-600">{item.title}</h3>
                    <p className="text-gray-600 text-center md:text-left text-sm">{item.description}</p>
                  </Link>
                );
              })}
              
              {/* Empty center div for spacing in mobile */}
              <div className="hidden md:block md:col-start-2 md:row-start-1 md:row-end-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
