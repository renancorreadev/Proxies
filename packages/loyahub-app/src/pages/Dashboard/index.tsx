/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import {
  useFetchMetadata,
  useFetchPoints,
  useFetchDrexBalance,
  useFetchTransfers,
} from '@/hooks/';
import { Toaster } from '@/components/ui';
import { useUserStore } from '@/store/store';
import { FaCoins, FaUserAlt, FaMapMarkerAlt } from 'react-icons/fa';
import {
  MdOutlineAccountBalanceWallet,
  MdOutlinePayment,
} from 'react-icons/md';

import { useModal } from '@/context/modal-provider';

// Components
import { ModalTransferTokens } from './ModalTransferTokens';
import { TransactionHistory } from './TransactionStory';
import { Attributes } from './Attributes';

export const Dashboard = () => {
  const { userData } = useUserStore();
  const userId = userData?.id;
  const email = sessionStorage.getItem('email');
  const walletAddress = userData?.walletAddress;

  const { metadata, loading: metadataLoading } = useFetchMetadata(
    userId?.toString()
  );
  const { points, loading: pointsLoading } = useFetchPoints(userId?.toString());
  const {
    drexBalance,
    loading: drexLoading,
    refreshDrexBalance,
  } = useFetchDrexBalance(email);
  const { loading: transfersLoading } = useFetchTransfers(walletAddress);

  const { openModal } = useModal();

  const loading =
    metadataLoading || pointsLoading || drexLoading || transfersLoading;

  const paymentStatusText =
    userData?.paymentStatus === 0
      ? 'Pendente'
      : userData?.paymentStatus === 1
        ? 'Completo'
        : 'Indefinido';

  const skeletonLoader = (
    <div className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg p-6 animate-pulse">
      <div className="h-6 bg-gray-700 rounded mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  const [transferKey, setTransferKey] = useState(0);

  const refreshTransfers = () => {
    setTransferKey((prev) => prev + 1); // Atualiza a key para forçar o remount
  };

  return (
    <div className="p-4 md:p-8 max-w-screen-xxl mx-auto text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105">
        <img
          src={userData?.profileImageUrl}
          alt="User Profile"
          className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-lg border-4 border-indigo-700"
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
        {loading ? (
          [1, 2, 3].map((key) => <div key={key}>{skeletonLoader}</div>)
        ) : (
          <>
            <div className="flex flex-col items-center bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              {/** @ts-expect-error */}
              <FaUserAlt size={40} className="mb-4" />
              <h3 className="text-lg font-semibold">Idade</h3>
              <p className="text-3xl font-bold">
                {userData?.age ?? 'Não Informado'}
              </p>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              {/** @ts-expect-error */}
              <FaMapMarkerAlt size={40} className="mb-4" />
              <h3 className="text-lg font-semibold">Endereço Local</h3>
              <p className="text-xl font-medium">
                {userData?.address?.City}, {userData?.address?.Street}, Nº{' '}
                {userData?.address?.HouseNumber} -{' '}
                {userData?.address?.PostalCode}
              </p>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              {/** @ts-expect-error */}
              <MdOutlinePayment size={40} className="mb-4" />
              <h3 className="text-lg font-semibold">Status do Pagamento</h3>
              <p
                className={`text-3xl font-bold ${
                  userData?.paymentStatus === 0
                    ? 'text-yellow-300'
                    : 'text-green-400'
                }`}
              >
                {paymentStatusText}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {loading ? (
          [1, 2].map((key) => <div key={key}>{skeletonLoader}</div>)
        ) : (
          <>
            <div className="flex flex-col items-center justify-center bg-purple-700 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 h-full">
              <FaCoins size={40} />
              <h3 className="text-lg font-semibold">Pontos</h3>
              <p className="text-3xl font-bold">
                {points !== null ? points : 'N/A'}
              </p>
            </div>

            <div className="flex flex-col items-center bg-teal-700 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <MdOutlineAccountBalanceWallet size={40} />
              <h3 className="text-lg font-semibold">Drex</h3>
              <p className="text-3xl font-bold">
                {drexBalance !== null ? `${drexBalance}` : 'N/A'}
              </p>
              <button
                onClick={openModal}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                Transferir
              </button>
            </div>
          </>
        )}
      </div>

      {/* Atributos */}
      {metadata && <Attributes attributes={metadata.attributes} />}
      {/* Histórico de Transações */}
      {walletAddress && (
        <TransactionHistory
          walletAddress={walletAddress}
          key={transferKey}
          refreshTransfers={refreshTransfers}
        />
      )}

      <ModalTransferTokens
        email={email ?? ''}
        sender={walletAddress ?? ''}
        refreshDrexBalance={refreshDrexBalance}
        onTransferSuccess={() => console.log('Transferência concluída!')}
      />
    </div>
  );
};
