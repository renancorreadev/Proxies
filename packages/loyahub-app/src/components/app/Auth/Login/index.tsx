// components/auth/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, DialogFooter, Input, Label } from '@/components/ui';
import { login } from '@/helpers/api/customer-api';
import { useUserStore } from '@/store/store';
import {
  LoginForm as LoginFormType,
  InputFieldsProps,
} from '../../../../helpers/@types/auth.types';
import { jwtDecode } from 'jwt-decode';

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await login(data.email, data.password);
      const { access_token } = response.data;
      const decoded = jwtDecode<{ email: string }>(access_token);
      if (decoded.email) {
        setUser(decoded.email, access_token);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
      <InputFields
        label="Email Address"
        id="email"
        type="email"
        register={register}
        requiredMsg="Email is required"
        errors={errors.email}
      />
      <InputFields
        label="Password"
        id="password"
        type="password"
        register={register}
        requiredMsg="Password is required"
        errors={errors.password}
      />
      <DialogFooter className="w-full mt-4 flex justify-end space-x-4">
        <Button type="submit" variant="default" size="lg" className="w-auto">
          Login
        </Button>
      </DialogFooter>
    </form>
  );
};

const InputFields = ({
  label,
  id,
  type,
  register,
  requiredMsg,
  validate,
  errors,
}: InputFieldsProps) => (
  <div className="mb-4">
    <Label htmlFor={id} className="block mb-2">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      {...register(id, { required: requiredMsg, validate })}
      className="w-full"
    />
    {errors && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
  </div>
);
