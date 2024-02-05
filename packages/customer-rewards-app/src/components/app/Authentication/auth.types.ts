/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from 'react-hook-form';

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface JwtPayload {
  email: string;
  exp: number;
}

export interface InputFieldsProps {
  label: string;
  id: string;
  type: string;
  register: UseFormRegister<any>;
  requiredMsg: string;
  validate?: (value: string) => string | boolean;
  errors?: FieldError | undefined;
}
