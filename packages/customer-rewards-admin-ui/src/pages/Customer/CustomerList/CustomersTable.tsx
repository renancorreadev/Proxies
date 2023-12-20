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
  addressLocal: AddressLocal;
}

export const CustomerTable = () => {
  const [customers, setCustomers] = useState<ClientData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log(apiURL);

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

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Usuários cadastrados na blockchain
      </h4>

      <div className="flex flex-col">
        {/* Renderize os controles de página aqui, por exemplo, botões "Anterior" e "Próxima" */}
        <div className="pagination mt-4 flex items-center justify-center space-x-4 p-4">
          <button
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-lg font-semibold text-black dark:text-white">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nome</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Idade</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Wallet</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Pagamento</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Endereço</h5>
          </div>
        </div>

        {customers.map((customer) => (
          <div
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            key={customer.clientID}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* <img src={BrandOne} alt="Brand" /> */}
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {customer.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer.age}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{customer.WalletAddress}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{customer.paymentStatus}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div>
                <p>
                  {customer.addressLocal.City} , {customer.addressLocal.Street} ,{' '}
                  {customer.addressLocal.PostalCode}, {customer.addressLocal.HouseNumber}
                </p>
              </div>
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
