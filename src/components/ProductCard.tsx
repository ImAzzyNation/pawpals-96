
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface ProductCardProps {
  id: string;
  name: string;
  image?: string; // For backward compatibility
  image_url?: string; // From database
  price: number;
  rating: number;
  category: string;
  isSale?: boolean;
  is_sale?: boolean; // From database
  salePercentage?: number;
  sale_percentage?: number; // From database
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  image_url, 
  price, 
  rating, 
  category,
  isSale = false,
  is_sale = false,
  salePercentage = 0,
  sale_percentage = 0
}: ProductCardProps) => {
  // Use database fields first, then fall back to the original props
  const isOnSale = is_sale || isSale;
  const discountPercentage = sale_percentage || salePercentage;
  const imageSource = image_url || image || '/placeholder.svg';
  
  const originalPrice = isOnSale ? price / (1 - discountPercentage / 100) : price;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover">
      <div className="relative">
        <img 
          src={imageSource} 
          alt={name} 
          className="w-full h-48 object-contain bg-gray-50 p-2"
        />
        {isOnSale && (
          <Badge className="absolute top-3 right-3 bg-red-500">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Badge 
          variant="outline" 
          className="absolute top-3 left-3 bg-white border-gray-200 text-gray-700"
        >
          {category}
        </Badge>
      </div>
      
      <div className="p-5">
        <Link to={`/shop/product/${id}`} className="hover:text-pawgreen-500">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{name}</h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-amber-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14}
                className={i < Math.floor(rating) ? 'fill-amber-400' : 'text-gray-300'}
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-1">
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
            {isOnSale && (
              <span className="text-gray-400 text-sm line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button size="icon" className="rounded-full bg-pawgreen-500 hover:bg-pawgreen-600">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
