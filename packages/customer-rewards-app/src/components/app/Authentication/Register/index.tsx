import React from 'react';
import { useForm } from 'react-hook-form';
import { register } from '@/helpers/api/customer-api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  onLoginClick: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onLoginClick }) => {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await register(data.email, data.password);

      alert(response.data.message);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register a New Account</DialogTitle>
          <DialogDescription>
            Enter your details below to create a new account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...formRegister('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...formRegister('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...formRegister('confirmPassword', {
              validate: (value) =>
                value === watch('password') || 'The passwords do not match',
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <DialogFooter>
            <Button type="submit">Register</Button>
            <Button variant="outline" onClick={onLoginClick}>
              Back to Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
