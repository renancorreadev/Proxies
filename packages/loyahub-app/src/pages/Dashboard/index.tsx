/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui';
import { useUserStore } from '@/store/store';
import { FaCoins } from 'react-icons/fa';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

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
  const [drexBalance, setDrexBalance] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserStore();

  useEffect(() => {
    const userId = userData?.id;
    const email = sessionStorage.getItem('email');

    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const [metadataResponse, pointsResponse, drexBalanceResponse] =
          await Promise.all([
            axios.get<Metadata>(
              `http://localhost:3001/api/v1/metadata/${userId}`
            ),
            axios.get<number>(`http://localhost:3001/api/v1/points/${userId}`),
            axios.get<number>(
              `http://localhost:3001/api/v1/erc20/balanceDrex/?email=${email}`
            ),
          ]);

        if (
          metadataResponse.data &&
          pointsResponse.data &&
          drexBalanceResponse.data !== null
        ) {
          setMetadata(metadataResponse.data);
          setPoints(pointsResponse.data);
          setDrexBalance(drexBalanceResponse.data);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <span className="animate-pulse text-2xl font-semibold">
          Carregando...
        </span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <Toaster />

      {/* Perfil do Usuário */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg animate-fade-in">
        <img
          src={userData?.profileImageUrl}
          alt="User Profile"
          className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-lg border-4 border-gray-700"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            {userData?.username}
          </h2>
          <p className="text-gray-400">Email: {userData?.email}</p>
          <p className="text-gray-400">Wallet: {userData?.walletAddress}</p>
          <p className="text-gray-400">Localização: {userData?.address.City}</p>
        </div>
      </div>

      {/* Informações do Token e Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fade-in-up">
        <div className="bg-gray-700 bg-opacity-75 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Token ID</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {metadata?.tokenID}
          </p>
        </div>
        <div className="bg-gray-700 bg-opacity-75 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Criado em</h3>
          <p className="text-xl font-medium text-gray-300">
            {new Date(metadata?.createdAt || '').toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-700 bg-opacity-75 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Atualizado em</h3>
          <p className="text-xl font-medium text-gray-300">
            {new Date(metadata?.updatedAt || '').toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 lg:px-24 animate-fade-in-up">
        {/* Pontos Card */}
        <div className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
          {/** // @ts-ignore */}
          <FaCoins size={40} className="mb-4" />
          <h3 className="text-lg font-semibold">Pontos</h3>
          <p className="text-3xl font-bold">
            {points !== null ? points : 'N/A'}
          </p>
        </div>

        {/* Balance Card */}
        <div className="flex flex-col items-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
          {/** // @ts-ignore */}
          <MdOutlineAccountBalanceWallet size={40} className="mb-4" />
          <h3 className="text-lg font-semibold">Drex</h3>
          <p className="text-3xl font-bold">
            R$ {drexBalance !== null ? drexBalance : 'N/A'}
          </p>
        </div>
      </div>

      {/* Atributos */}
      <div className="mb-10 animate-fade-in-up">
        <h3 className="text-2xl font-semibold mb-6">Atributos</h3>
        <ul className="space-y-6">
          {metadata?.attributes.map((attr, index) => (
            <li
              key={index}
              className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6"
            >
              <p className="text-lg font-medium text-gray-100">{attr.type}</p>
              {Array.isArray(attr.value) ? (
                <ul className="mt-2 space-y-2">
                  {(attr.value as Benefit[]).map((benefit, i) => (
                    <li key={i} className="text-gray-300">
                      {benefit.description} -{' '}
                      {benefit.discount ||
                        benefit.FreeFrete ||
                        benefit.promotionLevel ||
                        benefit.doublePoints}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 mt-1">{attr.value}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Benefícios Exclusivos */}
      <div className="animate-fade-in-up">
        <h3 className="text-2xl font-semibold mb-6">Benefícios Exclusivos</h3>
        <ul className="space-y-6">
          {metadata?.attributes
            .filter((attr) => attr.type === 'benefit_type')
            .flatMap((attr) => attr.value as Benefit[])
            .map((benefit, i) => (
              <li
                key={i}
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <p className="text-lg font-medium text-gray-900">
                  {benefit.description}
                </p>
                <p className="text-gray-700 text-sm">
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
