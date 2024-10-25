import axios from 'axios';
import { useEffect, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { apiURL } from '@/utils/keys';

import { RewardCardProps, RewardsCard } from './Card';

export const RewardsPage = () => {
  const [rewardsData, setRewardsData] = useState<RewardCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrentId = async () => {
    try {
      const response = await axios.get(`${apiURL}/client/currentId`);
      return response.data;
    } catch (error) {
      console.error('Error fetching currentId:', error);
    }
  };
  const fetchRewards = async () => {
    try {
      const itemsData = [];
      const currentId = await fetchCurrentId();

      for (let i = 1; i <= currentId; i++) {
        const response = await axios.get(`${apiURL}/metadata/${i}`);
        itemsData.push(response.data);
      }

      setRewardsData(itemsData);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  if (loading) {
    return <p>Loading rewards...</p>;
  }

  console.log(rewardsData);
  return (
    <>
      <Breadcrumb pageName="Rewards" />

      <div className="py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 my-4">
          {rewardsData.map((reward, index) => (
            <div key={index} className="">
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
      </div>
    </>
  );
};
