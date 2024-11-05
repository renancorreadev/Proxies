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

import { useNavigate } from 'react-router-dom';

export const AuthDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsOpen(false); // Fecha o Dialog
    navigate('/register'); // Navega para a página de registro
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Login/Register
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md w-full mx-auto p-4">
        <DialogHeader className="w-full">
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Please enter your email and password below to continue.
          </DialogDescription>
        </DialogHeader>
        <Login />
        <DialogFooter className="w-full mt-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            size="lg"
            className="w-auto"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
