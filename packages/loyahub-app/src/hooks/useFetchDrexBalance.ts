import { useEffect, useState } from 'react';
import { axiosConfig } from '@/helpers/config';
import { toast } from 'sonner';

export const useFetchDrexBalance = (email: string | null) => {
  const [drexBalance, setDrexBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!email) return;

    const fetchDrexBalance = async () => {
      setLoading(true);
      try {
        const response = await axiosConfig.get<number>(
          `/api/v1/erc20/token-balance/?email=${email}`
        );

        const balanceInEther = Number(response.data) / 1e18;

        setDrexBalance(
          balanceInEther.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      } catch (error) {
        toast.error('Erro ao carregar o saldo Drex.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrexBalance();
  }, [email]);

  return { drexBalance, loading };
};
