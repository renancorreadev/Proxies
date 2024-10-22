/* eslint-disable @typescript-eslint/ban-ts-comment */
// pages/Home/components/AnimatedNFT.tsx
import React from 'react';

interface AnimatedNFTProps {
  level: string;
}

// @ts-ignore
export const AnimatedNFT: React.FC<AnimatedNFTProps> = ({ level }) => {
  const colors = {
    Premium: 'from-yellow-400 to-yellow-600',
    Gold: 'from-yellow-600 to-yellow-800',
    Titanium: 'from-gray-500 to-gray-800',
  };

  return (
    <div
      className={`w-24 h-24 mx-auto bg-gradient-to-br ${colors[level]} rounded-full animate-pulse`}
    >
      <p className="text-white text-center mt-8 font-bold">{level}</p>
    </div>
  );
};
