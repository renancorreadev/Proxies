/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui';
import { useUserStore } from '@/store/store';

interface Benefit {
  discount?: string;
  FreeFrete?: string;
  description: string;
  promotionLevel?: string;
  doublePoints?: string;
}

interface Attribute {
  type: string;
  value: number | string | Benefit[];
}

interface Metadata {
  tokenID: number;
  customer: string;
  description: string;
  image: string;
  insight: string;
  attributes: Attribute[];
  createdAt: string;
  updatedAt: string;
}

export const Dashboard = () => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserStore();

  useEffect(() => {
    const userId = userData?.id;

    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const [metadataResponse, pointsResponse] = await Promise.all([
          axios.get<Metadata>(
            `http://localhost:3001/api/v1/metadata/${userId}`
          ),
          axios.get<{ points: number }>(
            `http://localhost:3001/api/v1/points/${userId}`
          ),
        ]);

        if (metadataResponse.data && pointsResponse.data !== null) {
          setMetadata(metadataResponse.data);
          // @ts-ignore
          setPoints(pointsResponse.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar os dados. Tente novamente.', {
          action: {
            label: 'Tentar novamente',
            onClick: fetchMetadata,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [userData]);
  console.log('points', points);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Carregando...</span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <Toaster />

      {/* Boas-vindas e Perfil do Cliente */}
      <div className="text-center mb-8">
        <img
          src={metadata?.image}
          alt="NFT Image"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto"
        />
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          {metadata?.customer}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          {metadata?.description}
        </p>
        <span className="text-sm text-yellow-500 font-medium">
          {metadata?.insight}
        </span>
      </div>

      {/* Informações do Token e Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Token ID</h3>
          <p className="text-gray-500">{metadata?.tokenID}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Criado em</h3>
          <p className="text-gray-500">
            {new Date(metadata?.createdAt || '').toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Atualizado em</h3>
          <p className="text-gray-500">
            {new Date(metadata?.updatedAt || '').toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:px-24 gap-4 mb-8 justify-center ">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold">Pontos</h3>
          <p className="text-2xl font-bold">
            {points !== null ? points : 'N/A'}
          </p>
        </div>
      </div>

      {/* Atributos */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Atributos</h3>
        <ul className="space-y-4">
          {metadata?.attributes.map((attr, index) => (
            <li key={index} className="bg-gray-50 rounded-lg shadow p-4">
              <p className="text-gray-800 font-medium">{attr.type}</p>
              {Array.isArray(attr.value) ? (
                <ul className="mt-2 space-y-2">
                  {(attr.value as Benefit[]).map((benefit, i) => (
                    <li key={i} className="text-gray-600">
                      {benefit.description} -{' '}
                      {benefit.discount ||
                        benefit.FreeFrete ||
                        benefit.promotionLevel ||
                        benefit.doublePoints}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-1">{attr.value}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Benefícios */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Benefícios Exclusivos</h3>
        <ul className="space-y-4">
          {metadata?.attributes
            .filter((attr) => attr.type === 'benefit_type')
            .flatMap((attr) => attr.value as Benefit[])
            .map((benefit, i) => (
              <li
                key={i}
                className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-4 shadow"
              >
                <p className="text-gray-800 font-medium">
                  {benefit.description}
                </p>
                <p className="text-gray-600 text-sm">
                  {benefit.discount ||
                    benefit.FreeFrete ||
                    benefit.promotionLevel ||
                    benefit.doublePoints}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
