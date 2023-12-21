import axios from 'axios';
import { useEffect, useState } from 'react';

import { apiURL } from '@/utils/keys';

export type AddressLocal = {
  City: string;
  Street: string;
  PostalCode: number;
  HouseNumber: number;
};

export interface ClientData {
  clientID: number;
  name: string;
  age: number;
  WalletAddress: string;
  paymentStatus: number;
  points: number;
  addressLocal: AddressLocal;
}

export const CustomerTable = () => {
  const [customers, setCustomers] = useState<ClientData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCustomers = async () => {
    try {
      const response = await axios.get<ClientData[]>(`${apiURL}/customer/all`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const truncateStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Feedback opcional para o usuário
        alert('Endereço da carteira copiado!');
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Usuários cadastrados na blockchain
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="col-span-1 p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nome</h5>
          </div>
          <div className="col-span-2 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Wallet</h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Idade</h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Points</h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Endereço</h5>
          </div>
        </div>

        {customers.map((customer) => (
          <div
            key={customer.clientID}
            className="grid grid-cols-6 border-b border-stroke dark:border-strokedark"
          >
            <div className="col-span-1 flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white" style={truncateStyle}>
                {customer.name}
              </p>
            </div>

            <div
              className="col-span-2 flex items-center justify-center p-2.5 xl:p-5 bg-bodydark1 bg-opacity-25"
              onDoubleClick={() => copyToClipboard(customer.WalletAddress)}
              style={{ cursor: 'pointer' }}
            >
              <p className="text-meta-3" style={truncateStyle}>
                {customer.WalletAddress}
              </p>
            </div>

            <div className="col-span-1 flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer.age}</p>
            </div>

            <div className="col-span-1 flex items-center justify-center p-2.5 xl:p-5 bg-bodydark1 bg-opacity-25">
              <p className="text-black dark:text-white">{customer.points}</p>
            </div>

            <div className="col-span-1 flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer.addressLocal.City}</p>
            </div>
          </div>
        ))}

        {/* Renderize novamente os controles de página aqui */}
        <div className="pagination flex items-center justify-center mt-4">
          <button
            className={`px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-xs ${
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-black dark:text-white'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="text-xs mx-2">
            Pág. {currentPage} de {totalPages}
          </span>
          <button
            className={`px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-xs ${
              currentPage === totalPages
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-black dark:text-white'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
