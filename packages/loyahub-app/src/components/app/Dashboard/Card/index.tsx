// components/Card.tsx
import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  icon,
  title,
  subtitle,
  image,
}) => {
  return (
    <div
      className={`flex flex-col bg-gradient-to-r from-blue-900 via-purple-800 to-gray-900 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ${className}`}
    >
      {image && (
        <div className="rounded-lg overflow-hidden mb-4">
          <img
            src={image}
            alt={title || 'Card Image'}
            className="w-full h-40 object-cover object-center"
          />
        </div>
      )}
      {icon && (
        <div className="flex justify-center items-center mb-4">
          <div className="p-4 bg-purple-700 rounded-full shadow-md">{icon}</div>
        </div>
      )}
      {title && <h3 className="text-lg font-bold text-center mb-2">{title}</h3>}
      {subtitle && (
        <p className="text-sm text-gray-300 text-center mb-4">{subtitle}</p>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};
