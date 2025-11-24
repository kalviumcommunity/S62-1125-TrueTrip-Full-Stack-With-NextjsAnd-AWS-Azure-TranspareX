import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  price?: number;
  location?: string;
  rating?: number;
  children?: ReactNode;
}

export default function Card({ 
  title, 
  description, 
  image, 
  price, 
  location, 
  rating, 
  children 
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {price && (
            <span className="text-lg font-semibold text-blue-600">
              ${price}
            </span>
          )}
        </div>
        
        {location && (
          <p className="text-gray-600 mb-2 flex items-center gap-1">
            📍 {location}
          </p>
        )}
        
        {rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">⭐</span>
            <span className="text-gray-700">{rating}/5</span>
          </div>
        )}
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}