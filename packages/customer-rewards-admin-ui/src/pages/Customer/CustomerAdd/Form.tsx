import axios from 'axios';
import React, { useState } from 'react';

import { Loader } from '../../../components/Loader';
interface AddressLocalDto {
  City: string;
  Street: string;
  PostalCode: number;
  HouseNumber: string;
}

interface ClientFormData {
  name: string;
  age: number;
  WalletAddress: string;
  paymentStatus: number;
  address: AddressLocalDto;
}

export const ClientRegistrationForm: React.FC = () => {
  const initialFormData: ClientFormData = {
    name: '',
    age: 0,
    WalletAddress: '',
    paymentStatus: 0,
    address: {
      City: '',
      Street: '',
      PostalCode: 0,
      HouseNumber: '',
    },
  };

  const [submitStatus, setSubmitStatus] = useState({ isLoading: false, error: null });
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split('.');

    if (parentKey === 'address') {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [childKey]: childKey === 'PostalCode' ? parseInt(value, 10) : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'age' || name === 'paymentStatus' ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/client/new',
        formData,
      );
      console.log(response.data);
      alert('Cadastro realizado com sucesso!');
      setSubmitStatus({ isLoading: false, error: null });
      setFormData(initialFormData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na resposta:', error.response);
        alert('Erro ao enviar dados: ' + error.response?.statusText);
      } else {
        console.error('Erro inesperado:', error);
        alert('Erro inesperado ao enviar dados.');
      }
      setSubmitStatus({ isLoading: false, error: 'Erro na requisição' });
    }
  };

  return (
    <>
      <Loader isLoading={submitStatus.isLoading} width={100} height={100} />
      <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input para Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>

            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="age"
              value={formData.age.toString()}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para Wallet Address */}
          <div className="mb-4">
            <label
              htmlFor="WalletAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Address:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="WalletAddress"
              value={formData.WalletAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para Payment Status */}
          <div className="mb-4">
            <label
              htmlFor="paymentStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Status:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="paymentStatus"
              value={formData.paymentStatus.toString()}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para City */}
          <div className="mb-4">
            <label
              htmlFor="address.City"
              className="block text-sm font-medium text-gray-700"
            >
              City:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="address.City"
              value={formData.address.City}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para Street */}
          <div className="mb-4">
            <label
              htmlFor="address.Street"
              className="block text-sm font-medium text-gray-700"
            >
              Street:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="address.Street"
              value={formData.address.Street}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para Postal Code */}
          <div className="mb-4">
            <label
              htmlFor="address.PostalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="address.PostalCode"
              value={formData.address.PostalCode.toString()}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input para House Number */}
          <div className="mb-4">
            <label
              htmlFor="address.HouseNumber"
              className="block text-sm font-medium text-gray-700"
            >
              House Number:
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="address.HouseNumber"
              value={formData.address.HouseNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          Submit
        </button>
      </form>
    </>
  );
};
