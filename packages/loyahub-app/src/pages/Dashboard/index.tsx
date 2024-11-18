/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  MdOutlineArrowUpward,
  MdOutlineAccountBalanceWallet,
  MdOutlinePayment,
} from 'react-icons/md';

import { Benefit } from '@/helpers/@types/metadata-types';

import { useModal } from '@/context/modal-provider';
import { ModalTransferTokens } from './ModalTransferTokens';

export const Dashboard = () => {
  const { userData } = useUserStore();
  const userId = userData?.id;
  const email = sessionStorage.getItem('email');
  const walletAddress = userData?.walletAddress;

  const { metadata, loading: metadataLoading } = useFetchMetadata(
    userId?.toString()
  );
  const { points, loading: pointsLoading } = useFetchPoints(userId?.toString());
  const { drexBalance, loading: drexLoading } = useFetchDrexBalance(email);
  const { transfers, loading: transfersLoading } =
    useFetchTransfers(walletAddress);

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
            <div className="flex flex-col items-center bg-purple-700 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
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

      {/** Dashboard */}
      <div className="grid grid-cols-1 md:px-16 gap-6 mb-10">
        <div className="flex flex-col items-center bg-gradient-to-r from-blue-900 via-purple-800 to-gray-900 text-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-6 text-center border-b-2 border-purple-500 pb-2 font-sans">
            Histórico de Transferências
          </h3>
          {transfers.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {transfers.map((transfer) => (
                <li
                  key={transfer.id}
                  className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-sans"
                >
                  <div className="flex items-center gap-4">
                    {/* Ícone indicando entrada */}
                    <div className="p-2 rounded-full bg-green-500">
                      <MdOutlineArrowUpward size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">
                        <span className="font-semibold text-blue-300">
                          Data:
                        </span>{' '}
                        {transfer.blockTimestamp}
                      </p>
                      <p className="text-sm text-gray-400 font-medium">
                        <span className="font-semibold text-blue-300">
                          Hash:
                        </span>{' '}
                        <a
                          href={`https://etherscan.io/tx/${transfer.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 underline hover:text-purple-500 transition-colors"
                        >
                          {transfer.transactionHash.slice(0, 10)}...
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex flex-col text-left">
                      <p className="text-gray-400 font-medium">
                        <span className="font-semibold text-blue-300">De:</span>{' '}
                        <span className="text-white">
                          {transfer.from.slice(0, 10)}...
                        </span>
                      </p>
                      <p className="text-gray-400 font-medium">
                        <span className="font-semibold text-blue-300">
                          Para:
                        </span>{' '}
                        <span className="text-white">
                          {transfer.to.slice(0, 10)}...
                        </span>
                      </p>
                    </div>
                    <div className="text-right md:text-center">
                      <p className="text-lg font-bold text-green-400">
                        + {transfer.formattedValue}
                      </p>
                      <p className="text-sm text-gray-400 font-medium">
                        Valor Recebido
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center font-medium">
              Nenhuma transferência encontrada.
            </p>
          )}
        </div>
      </div>

      <ModalTransferTokens
        email={email ?? ''}
        onTransferSuccess={() => console.log('Transferência concluída!')}
      />
    </div>
  );
};
