/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';

import { AdminForm, Field, FormLayout } from '@/components/AdminForm';
import Breadcrumb from '@/components/Breadcrumb';
import { Loader } from '@/components/Loader/Loader';
import { apiURL } from '@/utils/keys';

export function AddPointPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress: '',
    points: 0,
  });

  const fields: Field[] = [
    { label: 'Wallet Address', type: 'string', name: 'walletAddress', required: true },
    { label: 'Points', type: 'number', name: 'points', required: true },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'points' ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // First get the clientId
      const clientResponse = await axios.get(
        `${apiURL}/client/dataByWallet/${formData.walletAddress}`,
      );
      const clientId = clientResponse.data.clientID;

      const pointsResponse = await axios.post(`${apiURL}/points/add`, {
        clientId,
        points: formData.points,
      });

      console.log(pointsResponse.data);
      alert('Pontos adicionados com sucesso!');
      setFormData({ walletAddress: '', points: 0 });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao adicionar pontos.');
    }

    setIsLoading(false);
  };

  const formLayout: FormLayout = {
    columns: 1,
    gap: '4',
    align: 'start',
    submitButtonStyle: { backgroundColor: '#4F46E5', color: 'white' },
  };

  return (
    <div>
      <Breadcrumb pageName="Adicionar Pontos " />
      <Loader isLoading={isLoading} />
      <div>
        <AdminForm
          fields={fields}
          layout={formLayout}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          formData={formData}
        />
      </div>
    </div>
  );
}
