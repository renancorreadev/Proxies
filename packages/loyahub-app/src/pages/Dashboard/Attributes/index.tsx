import { GradientTitle } from '@/components/app/Dashboard/GradientTitle';
import React from 'react';

interface Attribute {
  type: string;
  value: string | number | Benefit[];
}

interface Benefit {
  description: string;
  discount?: string;
  FreeFrete?: string;
  promotionLevel?: string;
  doublePoints?: string;
}

interface AttributesProps {
  attributes: Attribute[];
}

export const Attributes: React.FC<AttributesProps> = ({ attributes }) => {
  return (
    <div className="mb-10">
      <div className="mb-6 flex justify-start">
        <GradientTitle>Atributos</GradientTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attributes.map((attr, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
              {attr.type}
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-green-400 mb-4">
                {attr.type}
              </h4>
              {Array.isArray(attr.value) ? (
                <ul className="space-y-3">
                  {(attr.value as Benefit[]).map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 bg-gray-800 bg-opacity-50 p-3 rounded-lg shadow-md"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">
                        {benefit.description}{' '}
                        <span className="text-green-400 font-bold">
                          {benefit.discount ||
                            benefit.FreeFrete ||
                            benefit.promotionLevel ||
                            benefit.doublePoints}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : typeof attr.value === 'number' ? (
                <p className="text-lg text-gray-400 mt-2 font-bold">
                  {attr.value}
                </p>
              ) : (
                <p className="text-gray-400 mt-2">{attr.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
