/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useUserStore } from '@/store/store';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { CogIcon } from '@heroicons/react/24/outline'; // Importando ícone de dashboard
import React from 'react';
import { Link } from 'react-router-dom';

export const UserProfile = () => {
  const { email } = useUserStore();
  const walletAddress = '0x1234567890abcdef';

  // Função para extrair e formatar o nome do usuário a partir do e-mail
  const formatUserName = (email: string) => {
    const [username] = email.split('@');
    const formattedName = username
      .split('.')
      .map((namePart) => namePart.charAt(0).toUpperCase() + namePart.slice(1))
      .join(' ');
    return formattedName;
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="text-lg tracking-tight text-slate-300 mb-1">
          Olá, {email ? formatUserName(email) : 'Usuário'}
        </p>
      </div>
      {/** @ts-ignore */}
      <Menu as="div" className="relative">
        <MenuButton className="text-slate-300 focus:outline-none transition-transform duration-200 hover:rotate-90">
          <CogIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              Digital Wallet: <span className="font-mono">{walletAddress}</span>
            </div>

            <MenuItem>
              {({ active }: { active: boolean }) => (
                <Link
                  to="/dashboard"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors duration-150`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                  Dashboard
                </Link>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
