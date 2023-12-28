import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';

import { RewardsCard } from './Card';

// Exemplo de dados que podem vir de uma API
const rewardData = [
  {
    tokenID: 2,
    customer: 'Renan',
    description: 'Você ainda não alcançou nenhuma insígnia e nenhum nível',
    image: 'https://i.ibb.co/prc9f7K/gold.png',
    insight: 'sem insígnia',
    attributes: [
      {
        type: 'level_type',
        value: 0,
      },
      {
        type: 'nft_type',
        value: 'Sem NFT',
      },
      {
        type: 'benefit_type',
        value: 'None',
      },
    ],
    createdAt: '2023-12-21T13:41:45.171Z',
    updatedAt: '2023-12-21T13:43:27.154Z',
  },
  {
    tokenID: 2,
    customer: 'Renan',
    description: 'Você ainda não alcançou nenhuma insígnia e nenhum nível',
    image: 'https://i.ibb.co/prc9f7K/gold.png',
    insight: 'sem insígnia',
    attributes: [
      {
        type: 'level_type',
        value: 0,
      },
      {
        type: 'nft_type',
        value: 'Sem NFT',
      },
      {
        type: 'benefit_type',
        value: 'None',
      },
    ],
    createdAt: '2023-12-21T13:41:45.171Z',
    updatedAt: '2023-12-21T13:43:27.154Z',
  },
  {
    tokenID: 2,
    customer: 'Renan',
    description: 'Você ainda não alcançou nenhuma insígnia e nenhum nível',
    image: 'https://i.ibb.co/prc9f7K/gold.png',
    insight: 'sem insígnia',
    attributes: [
      {
        type: 'level_type',
        value: 0,
      },
      {
        type: 'nft_type',
        value: 'Sem NFT',
      },
      {
        type: 'benefit_type',
        value: 'None',
      },
    ],
    createdAt: '2023-12-21T13:41:45.171Z',
    updatedAt: '2023-12-21T13:43:27.154Z',
  },
  {
    tokenID: 2,
    customer: 'Renan',
    description: 'Você ainda não alcançou nenhuma insígnia e nenhum nível',
    image: 'https://i.ibb.co/prc9f7K/gold.png',
    insight: 'sem insígnia',
    attributes: [
      {
        type: 'level_type',
        value: 0,
      },
      {
        type: 'nft_type',
        value: 'Sem NFT',
      },
      {
        type: 'benefit_type',
        value: 'None',
      },
    ],
    createdAt: '2023-12-21T13:41:45.171Z',
    updatedAt: '2023-12-21T13:43:27.154Z',
  },
];

export const RewardsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Rewards" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewardData.map((reward, index) => (
          <div key={index}>
            <RewardsCard
              tokenID={reward.tokenID}
              customer={reward.customer}
              description={reward.description}
              image={reward.image}
              insight={reward.insight}
              attributes={reward.attributes}
              createdAt={reward.createdAt}
              updatedAt={reward.updatedAt}
            />
          </div>
        ))}
      </div>
    </>
  );
};
