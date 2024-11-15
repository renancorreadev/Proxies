import { useEffect, useState } from 'react';
import { axiosConfig } from '@/helpers/config';
import { toast } from 'sonner';
import { Metadata } from '@/helpers/@types/metadata-types';

export const useFetchMetadata = (userId: string | undefined) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const response = await axiosConfig.get<Metadata>(
          `/api/v1/metadata/${userId}`
        );
        setMetadata(response.data);
      } catch (error) {
        toast.error('Erro ao carregar os dados de metadata.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [userId]);

  return { metadata, loading };
};
