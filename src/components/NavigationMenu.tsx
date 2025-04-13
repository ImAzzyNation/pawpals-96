
import React from 'react';
import { Link } from 'react-router-dom';
import { Dog, AlertTriangle, HelpCircle, ShoppingCart, UserRound } from 'lucide-react';

const NavigationMenu = () => {
  const menuItems = [
    {
      icon: <Dog className="w-10 h-10 text-pawgreen-600" />,
      title: "Adoption",
      description: "Browse pets looking for a loving home and start the adoption process today.",
      link: "/adopt",
      position: "top-left"
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-pawgreen-600" />,
      title: "Lost Pets",
      description: "Report lost pets or help reunite furry friends with their families.",
      link: "/lost",
      position: "top-right"
    },
    {
      icon: <ShoppingCart className="w-10 h-10 text-pawgreen-600" />,
      title: "Pet Supplies",
      description: "Shop for food, toys, and other essential supplies for your pets.",
      link: "/shop",
      position: "bottom-left"
    },
    {
      icon: <UserRound className="w-10 h-10 text-pawgreen-600" />,
      title: "Profile",
      description: "Manage your account and track your pet-related activities.",
      link: "/profile",
      position: "bottom-right"
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-pawgreen-600" />,
      title: "Online Help",
      description: "Access expert advice and support from other pet lovers in our forum.",
      link: "/help",
      position: "bottom-center"
    }
  ];

  return (
    <div className="py-16 bg-pawbg relative">
      <div className="paw-container">
        <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-12">Our Services</h2>
        
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-5xl">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-xs mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Cute Golden Retriever" 
                className="w-full rounded-full border-4 border-pawgreen-500 shadow-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ minHeight: "600px" }}>
              {menuItems.map((item, index) => {
                let positionClass = "";
                switch(item.position) {
                  case "top-left":
                    positionClass = "md:col-start-1 md:row-start-1";
                    break;
                  case "top-right":
                    positionClass = "md:col-start-3 md:row-start-1";
                    break;
                  case "bottom-left":
                    positionClass = "md:col-start-1 md:row-start-3";
                    break;
                  case "bottom-right":
                    positionClass = "md:col-start-3 md:row-start-3";
                    break;
                  case "bottom-center":
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
              
              <div className="hidden md:block md:col-start-2 md:row-start-1 md:row-end-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
