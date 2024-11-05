import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui';
import { Login } from '../Login';
import { RegisterForm } from '../UserRegister';
import { useNavigate } from 'react-router-dom';

export const AuthDialog: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsRegistering(true);
    navigate('/register');
  };

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
        {isRegistering ? <RegisterForm /> : <Login />}
        <DialogFooter className="w-full mt-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            size="lg"
            className="w-auto"
            onClick={() => {
              isRegistering ? setIsRegistering(false) : handleRegisterClick();
            }}
          >
            {isRegistering ? 'Back to Login' : 'Register'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
