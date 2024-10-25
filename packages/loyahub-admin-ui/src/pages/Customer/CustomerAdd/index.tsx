import Breadcrumb from '../../../components/Breadcrumb';
import { ClientRegistrationForm } from './Form';

export const CustomerAdd = () => {
  return (
    <div>
      <Breadcrumb pageName="New Customer" />

      <ClientRegistrationForm />
    </div>
  );
};
