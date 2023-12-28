/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface RewardCardProps {
  tokenID: number;
  customer: string;
  description: string;
  image: string;
  insight: string;
  attributes: Array<{ type: string; value: any }>;
  createdAt: string;
  updatedAt: string;
}

export const RewardsCard: React.FC<RewardCardProps> = ({
  tokenID,
  customer,
  description,
  image,
  insight,
  attributes,
  createdAt,
  updatedAt,
}) => {
  return (
    <div
      className="border text-card-foreground w-[350px] bg-white shadow-lg rounded-lg overflow-hidden"
      data-v0-t="card"
    >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt="" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">Token ID: {tokenID}</h3>
          <p className="text-white text-sm">Owned by {customer}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <h4 className="text-gray-900 text-md font-semibold">Description</h4>
          <p className="text-gray-600 text-sm">{description}</p>
          <h4 className="text-gray-900 text-md font-semibold">Insight</h4>
          <p className="text-gray-600 text-sm">{insight}</p>
          <div className="pt-2">
            <h4 className="text-gray-900 text-md font-semibold">Attributes</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {attributes.map((attribute, index) => (
                <li key={index}>{`${attribute.type}: ${attribute.value}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="items-center flex justify-between p-4 bg-gray-50">
        <span className="text-sm text-gray-500">
          Created: {new Date(createdAt).toLocaleDateString()}
        </span>
        <span className="text-sm text-gray-500">
          Updated: {new Date(updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
