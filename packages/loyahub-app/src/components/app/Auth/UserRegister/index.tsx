/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@/components/ui';
import { register as apiRegister } from '@/helpers/api/customer-api';
import {
  UserRegisterParamsType,
  UserRegisterResponse,
} from '@/helpers/@types/api-types';
import { AxiosResponse } from 'axios';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegisterParamsType>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const password = watch('password');

  const onSubmit = async (data: UserRegisterParamsType) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!', {
        description: 'Please make sure both passwords are the same.',
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response: AxiosResponse<UserRegisterResponse> =
        await apiRegister(data);
      toast.success(response.data.message, {
        description: 'You have successfully registered! Go to Home...',
        duration: 5000,
      });
      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed!', {
        description: 'Please check your details and try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-10xl bg-white shadow-md rounded-lg p-8 space-y-6"
    >
      <Toaster position="top-right" closeButton duration={5000} />
      <h2 className="text-3xl font-semibold text-start text-gray-700 mb-6">
        Register a New Account
      </h2>

      {/* Campos de Registro */}
      <div className="w-full max-w-10xl flex space-x-4 gap-8">
        <div className="w-full max-w-10xl space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            register={registerField}
            requiredMsg="Email is required"
            errors={errors.email}
          />
          <InputField
            label="Username"
            id="username"
            type="text"
            register={registerField}
            requiredMsg="Username is required"
            errors={errors.username}
          />
        </div>

        <div className="w-full max-w-10xl space-y-4">
          <InputField
            label="Profile Image URL"
            id="profileImageUrl"
            type="text"
            register={registerField}
            errors={errors.profileImageUrl}
          />
          <InputField
            label="Age"
            id="age"
            type="text"
            register={registerField}
            requiredMsg="Age is required"
            errors={errors.age}
          />
        </div>
      </div>

      <div className="w-full max-w-10xl flex space-x-4 gap-8">
        <div className="max-w-2xl space-y-4">
          <InputField
            label="Password"
            id="password"
            type="password"
            register={registerField}
            requiredMsg="Password is required"
            errors={errors.password}
          />
        </div>

        <div className="max-w-2xl space-y-4">
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            register={registerField}
            requiredMsg="Please confirm your password"
            validate={(value) => value === password || 'Passwords do not match'}
            errors={errors.confirmPassword}
          />
        </div>
      </div>

      {/* Campos de Endereço */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Address</h3>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <InputField
            label="City"
            id="address.City"
            type="text"
            register={registerField}
            requiredMsg="City is required"
            errors={errors.address?.City}
          />
          <InputField
            label="Street"
            id="address.Street"
            type="text"
            register={registerField}
            requiredMsg="Street is required"
            errors={errors.address?.Street}
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
          <InputField
            label="Postal Code"
            id="address.PostalCode"
            type="number"
            register={registerField}
            requiredMsg="Postal Code is required"
            errors={errors.address?.PostalCode}
          />
          <InputField
            label="House Number"
            id="address.HouseNumber"
            type="text"
            register={registerField}
            requiredMsg="House Number is required"
            errors={errors.address?.HouseNumber}
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end mt-8 space-x-4">
        <Button
          type="button"
          variant="outline"
          className="px-6 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-100 transition duration-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 flex items-center"
          disabled={isLoading}
        >
          {isLoading ? <span className="loader mr-2"></span> : 'Register'}
        </Button>
      </div>
    </form>
  );
};

// Componente InputField
interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  register: any;
  requiredMsg?: string;
  validate?: (value: string) => boolean | string;
  errors?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  register,
  requiredMsg,
  validate,
  errors,
}) => (
  <div>
    <Label
      htmlFor={id}
      className="block text-gray-600 text-sm font-medium mb-1"
    >
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      {...register(id, { required: requiredMsg, validate })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
    />
    {errors && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
  </div>
);
