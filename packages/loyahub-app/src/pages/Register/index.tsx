import { RegisterForm } from '@/components/app/Auth/UserRegister';
import { Container } from '@/components/ui';

export const Register = () => {
  return (
    <Container>
      {/* <Title title="Register a new User" /> */}
      <RegisterForm />
    </Container>
  );
};
