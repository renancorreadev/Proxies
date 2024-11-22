/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { axiosConfig } from '@/helpers/config';
import { toast } from 'sonner';

interface TokenTransferParams {
  email: string;
  sender: string;
  to: string;
  amount: number;
}

export const useTokenTransfer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transferTokens = async ({
    email,
    sender,
    to,
    amount,
  }: TokenTransferParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosConfig.post(
        'api/v1/erc20/token-transfer',
        { email, sender, to, amount },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Transferência realizada com sucesso!');
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as any).response?.data?.message ||
        'Erro ao realizar a transferência.';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { transferTokens, loading, error };
};
