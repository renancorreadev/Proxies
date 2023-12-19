import Breadcrumb from '../../../components/Breadcrumb';
import { CustomerTable } from './CustomersTable';

export const CustomerList = () => {
  return (
    <>
      <Breadcrumb pageName="Customers" />

      <div className="flex flex-col gap-10">
        <CustomerTable />
      </div>
    </>
  );
};
