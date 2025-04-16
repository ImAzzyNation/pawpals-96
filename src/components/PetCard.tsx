
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export interface PetCardProps {
  id: string;
  name: string;
  image?: string; // For backward compatibility
  image_url?: string; // From database
  breed: string;
  age: string;
  location: string;
  type: 'lost' | 'adopt';
  date?: string;
  date_reported?: string; // From database
}

const PetCard = ({ 
  id, 
  name, 
  image, 
  image_url, 
  breed, 
  age, 
  location, 
  type,
  date,
  date_reported
}: PetCardProps) => {
  // Use image_url from database if available, otherwise fall back to image prop
  const imageSource = image_url || image || '/placeholder.svg';
  // Use date_reported from database if available, otherwise fall back to date prop
  const displayDate = date_reported || date;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover">
      <div className="relative">
        <img 
          src={imageSource} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={`absolute top-3 right-3 ${
            type === 'lost' ? 'bg-red-500' : 'bg-pawgreen-500'
          }`}
        >
          {type === 'lost' ? 'Lost' : 'Adopt Me'}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{breed}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{age}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          {displayDate && type === 'lost' && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Lost on {displayDate}</span>
            </div>
          )}
        </div>
        
        <Button asChild className="w-full bg-pawgreen-500 hover:bg-pawgreen-600">
          <Link to={`/pet/${id}`}>
            {type === 'lost' ? 'I\'ve Seen This Pet' : 'Adopt Me'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
