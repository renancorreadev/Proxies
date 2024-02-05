import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

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
import { useUserStore } from '@/store/store';
import { login, register } from '@/helpers/api/customer-api';
import {
  InputFieldsProps,
  JwtPayload,
  LoginForm,
  RegisterForm,
} from '../auth.types';

export function Login() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginForm>();
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    watch,
    formState: { errors: errorsRegister },
  } = useForm<RegisterForm>();
  const setUser = useUserStore((state) => state.setUser);
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmitLogin = async (data: LoginForm) => {
    try {
      const response = await login(data.email, data.password);
      const { access_token } = response.data;
      const decoded = jwtDecode<JwtPayload>(access_token);
      if (decoded.email) {
        setUser(decoded.email, access_token);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const onSubmitRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await register({
        email: data.email,
        username: data.username,
        password: data.password,
        profileImageUrl: data.profileImageUrl,
        isAdmin: data.isAdmin,
      });
      alert(response.data.message);
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  const password = watch('password');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isRegistering ? 'Back to Login' : 'Login/Register'}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md w-full mx-auto p-4">
        <DialogHeader className="w-full">
          <DialogTitle>
            {isRegistering ? 'Register' : 'Login to Your Account'}
          </DialogTitle>
          <DialogDescription>
            {isRegistering
              ? 'Please enter your details to register.'
              : 'Please enter your email and password below to continue.'}
          </DialogDescription>
        </DialogHeader>
        {isRegistering ? (
          <form
            onSubmit={handleSubmitRegister(onSubmitRegister)}
            className="w-full mt-4"
          >
            {/* Registration form fields */}
            <InputFields
              label="Email"
              id="email"
              type="email"
              register={registerRegister}
              requiredMsg="Email is required"
              errors={errorsRegister.email}
            />

            <InputFields
              label="Username"
              id="username"
              type="text"
              register={registerRegister}
              requiredMsg="username is required"
              errors={errorsRegister.username}
            />

            <InputFields
              label="Profile Image"
              id="profileImageUrl"
              type="text"
              register={registerRegister}
              requiredMsg="profileImageUrl"
              errors={errorsRegister.profileImageUrl}
            />

            <InputFields
              validate={(value: string) =>
                value === password || 'Passwords do not match'
              }
              label="Password"
              id="password"
              type="password"
              register={registerRegister}
              requiredMsg="Password is required"
              errors={errorsRegister.password}
            />
            <InputFields
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              register={registerRegister}
              requiredMsg="Please confirm your password"
              validate={(value: string) =>
                value === password || 'Passwords do not match'
              }
              errors={errorsRegister.confirmPassword}
            />
            <DialogFooter className="w-full mt-4 flex justify-end space-x-4">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-auto"
              >
                Register
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitLogin(onSubmitLogin)}
            className="w-full mt-4"
          >
            {/* Login form fields */}
            <InputFields
              validate={(value: string) =>
                !value ||
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                'Invalid email address'
              }
              label="Email Address"
              id="email"
              type="email"
              register={registerLogin}
              requiredMsg="Email is required"
              errors={errorsLogin.email}
            />
            <InputFields
              validate={(value: string) =>
                !value ||
                value.length >= 4 ||
                'Password must be at least 4 characters'
              }
              label="Password"
              id="password"
              type="password"
              register={registerLogin}
              requiredMsg="Password is required"
              errors={errorsLogin.password}
            />
            <DialogFooter className="w-full mt-4 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-auto"
                onClick={() => setIsRegistering(true)}
              >
                Register
              </Button>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-auto"
              >
                Login
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InputFields({
  label,
  id,
  type,
  register,
  requiredMsg,
  validate,
  errors,
}: InputFieldsProps) {
  return (
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
}
