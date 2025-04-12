
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  isSale?: boolean;
  salePercentage?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  rating, 
  category,
  isSale = false,
  salePercentage = 0
}: ProductCardProps) => {
  const originalPrice = isSale ? price / (1 - salePercentage / 100) : price;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-contain bg-gray-50 p-2"
        />
        {isSale && (
          <Badge className="absolute top-3 right-3 bg-red-500">
            {salePercentage}% OFF
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
            {isSale && (
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
