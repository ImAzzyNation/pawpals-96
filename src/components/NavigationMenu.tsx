
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
      position: "top"
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
      position: "bottom-right-lower"  // New position to create more space
    },
    {
      icon: <UserRound className="w-10 h-10 text-pawgreen-600" />,
      title: "Profile",
      description: "Manage your account and track your pet-related activities.",
      link: "/profile",
      position: "bottom-left-lower"  // New position to create more space
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-pawgreen-600" />,
      title: "Online Help",
      description: "Access expert advice and support from other pet lovers in our forum.",
      link: "/help",
      position: "top-left"
    }
  ];

  return (
    <div className="py-24 bg-pawbg relative">
      <div className="paw-container">
        <h2 className="text-2xl md:text-3xl font-bold text-pawgreen-600 text-center mb-16">Our Services</h2>
        
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-5xl mx-auto" style={{ height: "700px" }}>
            {/* Central dog image */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-64 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Cute Golden Retriever" 
                className="w-full h-full object-cover rounded-full border-4 border-pawgreen-500 shadow-lg"
              />
            </div>
            
            {/* Star pattern navigation */}
            {menuItems.map((item, index) => {
              let positionClass = "";
              
              switch(item.position) {
                case "top":
                  positionClass = "absolute left-1/2 top-0 transform -translate-x-1/2";
                  break;
                case "top-right":
                  positionClass = "absolute right-0 top-1/4 transform translate-x-0";
                  break;
                case "bottom-right":
                  positionClass = "absolute right-0 bottom-1/4 transform translate-x-0";
                  break;
                case "bottom-right-lower":  // New position
                  positionClass = "absolute right-0 bottom-[10%] transform translate-x-0";
                  break;
                case "bottom-left":
                  positionClass = "absolute left-0 bottom-1/4 transform translate-x-0";
                  break;
                case "bottom-left-lower":  // New position
                  positionClass = "absolute left-0 bottom-[10%] transform translate-x-0";
                  break;
                case "top-left":
                  positionClass = "absolute left-0 top-1/4 transform translate-x-0";
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
                    flex flex-col items-center md:items-start gap-2 w-64
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
