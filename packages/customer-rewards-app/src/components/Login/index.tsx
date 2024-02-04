/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import axios from "axios";
import {  jwtDecode } from "jwt-decode";

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
} from "@/components/ui"; 
import { useUserStore } from "@/store/store";

interface LoginForm {
  email: string;
  password: string;
}

interface JwtPayload {
  email: string;
  exp: number;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/login", data);
      // Ajuste aqui para acessar `access_token`
      const { access_token } = response.data;
      
      // Decodificando o token para extrair informações do payload, como o email
      const decoded = jwtDecode<JwtPayload>(access_token); 
      if (decoded.email) {
        setUser(decoded.email, access_token); 
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md w-full mx-auto p-4">
        <DialogHeader className="w-full">
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Please enter your email and password below to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full"
            />
            {/* @ts-ignore */}
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full"
            />
            {/* @ts-ignore */}
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <DialogFooter className="w-full mt-4 flex justify-end">
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
      </DialogContent>
    </Dialog>
  );
}
