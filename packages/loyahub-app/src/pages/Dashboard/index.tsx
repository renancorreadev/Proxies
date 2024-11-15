/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFetchMetadata } from '@/hooks/useFetchMetadata';
import { useFetchPoints } from '@/hooks/useFetchPoints';
import { useFetchDrexBalance } from '@/hooks/useFetchDrexBalance';
import { Toaster } from '@/components/ui';
import { useUserStore } from '@/store/store';
import { FaCoins, FaUserAlt, FaMapMarkerAlt } from 'react-icons/fa';
import {
  MdOutlineAccountBalanceWallet,
  MdOutlinePayment,
} from 'react-icons/md';
import { Benefit } from '@/helpers/@types/metadata-types';

export const Dashboard = () => {
  const { userData } = useUserStore();
  const userId = userData?.id;
  const email = sessionStorage.getItem('email');

  const { metadata, loading: metadataLoading } = useFetchMetadata(
    userId?.toString()
  );
  const { points, loading: pointsLoading } = useFetchPoints(userId?.toString());
  const { drexBalance, loading: drexLoading } = useFetchDrexBalance(email);

  const loading = metadataLoading || pointsLoading || drexLoading;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <span className="animate-pulse text-2xl font-semibold">
          Carregando...
        </span>
      </div>
    );
  }

  let paymentStatusText;
  if (userData?.paymentStatus === 0) {
    paymentStatusText = 'Pendente';
  } else if (userData?.paymentStatus === 1) {
    paymentStatusText = 'Completo';
  } else {
    paymentStatusText = 'Indefinido';
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-xxl mx-auto text-white bg-gradient-to-br from-gray-900 to-gray-800 px-8">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg">
        <img
          src={userData?.profileImageUrl}
          alt="User Profile"
          className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-lg border-4 border-gray-700"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            {userData?.username}
          </h2>
          <p className="text-gray-400">Email: {userData?.email}</p>
          <p className="text-gray-400">Wallet: {userData?.walletAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-6 text-center animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
          {/** @ts-expect-error */}
          <FaUserAlt size={40} className="mb-4" />
          <h3 className="text-lg font-semibold">Idade</h3>
          <p className="text-3xl font-bold">
            {userData?.age ?? 'Não Informado'}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg p-6 text-center animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
          {/** @ts-expect-error */}
          <FaMapMarkerAlt size={40} className="mb-4" />
          <h3 className="text-lg font-semibold">Endereço Local</h3>
          <p className="text-xl font-medium">
            {userData?.address?.City}, {userData?.address?.Street}, Nº{' '}
            {userData?.address?.HouseNumber} - {userData?.address?.PostalCode}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg p-6 text-center animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
          {/** @ts-expect-error */}
          <MdOutlinePayment size={40} className="mb-4" />
          <h3 className="text-lg font-semibold">Status do Pagamento</h3>
          <p
            className={`text-3xl font-bold ${
              userData?.paymentStatus === 0
                ? 'text-yellow-200'
                : 'text-green-500'
            }`}
          >
            {paymentStatusText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="flex flex-col items-center bg-purple-500 text-white rounded-lg p-6 text-center animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
          <FaCoins size={40} />
          <h3 className="text-lg font-semibold">Pontos</h3>
          <p className="text-3xl font-bold">
            {points !== null ? points : 'N/A'}
          </p>
        </div>
        <div className="flex flex-col items-center bg-teal-500 text-white rounded-lg p-6 text-center animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
          <MdOutlineAccountBalanceWallet size={40} />
          <h3 className="text-lg font-semibold">Drex</h3>
          <p className="text-3xl font-bold">
            {drexBalance !== null ? `${drexBalance}` : 'N/A'}
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-6">Atributos</h3>
        <ul className="space-y-6">
          {metadata?.attributes.map((attr, index) => (
            <li
              key={index}
              className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6"
            >
              <p className="text-lg font-medium">{attr.type}</p>
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

      <div>
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
                <p className="text-lg font-medium">{benefit.description}</p>
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
