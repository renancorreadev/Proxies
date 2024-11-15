import { useEffect, useState } from 'react';
import { axiosConfig } from '@/helpers/config';
import { toast } from 'sonner';

export const useFetchPoints = (userId: string | undefined) => {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPoints = async () => {
      setLoading(true);
      try {
        const response = await axiosConfig.get<number>(
          `/api/v1/points/${userId}`
        );
        setPoints(response.data);
      } catch (error) {
        toast.error('Erro ao carregar os pontos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userId]);

  return { points, loading };
};
