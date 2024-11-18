/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Transfer {
  id: string;
  from: string;
  to: string;
  value: string;
  formattedValue: string;
  blockTimestamp: string;
  rawTimestamp: number;
  transactionHash: string;
  type: 'received' | 'sent';
}

export const useFetchTransfers = (walletAddress: string | undefined) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransfers = useCallback(async () => {
    if (!walletAddress) {
      console.error('Endereço da wallet está indefinido');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/subgraphs/name/drex',
        {
          query: `
            {
              receivedTransfers: transfers(where: { to: "${walletAddress.toLowerCase()}" }) {
                id
                from
                to
                value
                blockTimestamp
                transactionHash
              }
              sentTransfers: transfers(where: { from: "${walletAddress.toLowerCase()}" }) {
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

      const receivedTransfers = response.data.data.receivedTransfers || [];
      const sentTransfers = response.data.data.sentTransfers || [];

      const formatTransfers = (transfers: any[], type: 'received' | 'sent') =>
        transfers.map((transfer: Transfer) => ({
          ...transfer,
          type,
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
        }));

      const allTransfers = [
        ...formatTransfers(receivedTransfers, 'received'),
        ...formatTransfers(sentTransfers, 'sent'),
      ].sort((a, b) => b.rawTimestamp - a.rawTimestamp);

      setTransfers(allTransfers);
    } catch (error) {
      console.error('Erro ao carregar transferências:', error);
      toast.error('Erro ao carregar o histórico de transferências.');
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  return { transfers, loading, refreshTransfers: fetchTransfers };
};
