/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Transfer {
  id: string;
  from: string;
  to: string;
  value: string; // Valor original retornado pela API
  formattedValue: string; // Valor formatado para exibição
  blockTimestamp: string; // Data e hora formatada da transferência
  rawTimestamp: number; // Timestamp bruto para ordenação
  transactionHash: string; // Hash da transação
}

export const useFetchTransfers = (walletAddress: string | undefined) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!walletAddress) {
      console.error('Endereço da wallet está indefinido');
      return;
    }

    const fetchTransfers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:8000/subgraphs/name/drex',
          {
            query: `
            {
              transfers(
                where: { to: "${walletAddress.toLowerCase()}" }
              ) {
                id
                from
                to
                value
                blockTimestamp
                transactionHash
              }
            }
          `,
          }
        );

        const allTransfers = response.data.data.transfers || [];
        console.log('Filtered Transfers from GraphQL:', allTransfers);

        const formattedTransfers = allTransfers
          .map((transfer: Transfer) => ({
            ...transfer,
            rawTimestamp: Number(transfer.blockTimestamp),
            formattedValue: (Number(transfer.value) / 1e18).toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            ),
            blockTimestamp: new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).format(new Date(Number(transfer.blockTimestamp) * 1000)),
          }))
          .sort((a: any, b: any) => b.rawTimestamp - a.rawTimestamp); //sort recent date to old date

        setTransfers(formattedTransfers);
      } catch (error) {
        console.error('Erro ao carregar transferências:', error);
        toast.error('Erro ao carregar o histórico de transferências.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [walletAddress]);

  return { transfers, loading };
};
