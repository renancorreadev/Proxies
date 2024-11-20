import React from 'react';

interface GradientTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientTitle: React.FC<GradientTitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <h2
      className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-center mb-6 ${className}`}
    >
      {children}
    </h2>
  );
};
