import React from 'react';
import { useFetchTransfers } from '@/hooks/';
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';
import { GradientTitle } from '@/components/app/Dashboard/GradientTitle';

interface TransactionHistoryProps {
  walletAddress: string;
  refreshTransfers?: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  walletAddress,
  refreshTransfers,
}) => {
  const { transfers, loading } = useFetchTransfers(walletAddress);

  if (loading) {
    return (
      <p className="text-gray-400 text-center font-medium">Carregando...</p>
    );
  }

  if (!transfers.length) {
    return (
      <p className="text-gray-400 text-center font-medium">
        Nenhuma transferência encontrada.
      </p>
    );
  }

  // Separar transferências recebidas e enviadas
  const receivedTransfers = transfers.filter(
    (transfer) => transfer.to.toLowerCase() === walletAddress?.toLowerCase()
  );
  const sentTransfers = transfers.filter(
    (transfer) => transfer.from.toLowerCase() === walletAddress?.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Título com Gradiente */}

      <div className="flex flex-row justify-between">
        <GradientTitle>Extrato</GradientTitle>
        {refreshTransfers && (
          <button
            onClick={refreshTransfers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all self-center mb-4"
          >
            Atualizar Extrato
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Painel de Transferências Recebidas */}
        <div className="flex flex-col bg-gradient-to-b from-green-600 to-gray-800 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-center border-b-2 border-green-400 pb-2">
            Recebidas
          </h3>
          {receivedTransfers.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {receivedTransfers.map((transfer) => (
                <li
                  key={transfer.id}
                  className="py-4 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-green-500 shadow-md">
                      <MdOutlineArrowUpward size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        <span className="font-semibold text-green-300">
                          Data:
                        </span>{' '}
                        {transfer.blockTimestamp}
                      </p>
                      <p className="text-sm text-gray-300 font-medium">
                        <span className="font-semibold text-green-300">
                          Hash:
                        </span>{' '}
                        <a
                          href={`https://etherscan.io/tx/${transfer.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-300 underline hover:text-green-400"
                        >
                          {transfer.transactionHash.slice(0, 10)}...
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">
                      + {transfer.formattedValue}
                    </p>
                    <p className="text-sm text-gray-400">Valor Recebido</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-center font-medium">
              Nenhuma transferência recebida.
            </p>
          )}
        </div>

        {/* Painel de Transferências Enviadas */}
        <div className="flex flex-col bg-gradient-to-b from-red-600 to-gray-800 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-center border-b-2 border-red-400 pb-2">
            Enviadas
          </h3>
          {sentTransfers.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {sentTransfers.map((transfer) => (
                <li
                  key={transfer.id}
                  className="py-4 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-red-500 shadow-md">
                      <MdOutlineArrowDownward size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        <span className="font-semibold text-red-300">
                          Data:
                        </span>{' '}
                        {transfer.blockTimestamp}
                      </p>
                      <p className="text-sm text-gray-300 font-medium">
                        <span className="font-semibold text-red-300">
                          Hash:
                        </span>{' '}
                        <a
                          href={`https://etherscan.io/tx/${transfer.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-300 underline hover:text-red-400"
                        >
                          {transfer.transactionHash.slice(0, 10)}...
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-400">
                      - {transfer.formattedValue}
                    </p>
                    <p className="text-sm text-gray-400">Valor Enviado</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-center font-medium">
              Nenhuma transferência enviada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
