/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFetchDrexBalance } from '@/hooks';
import { useUserStore } from '@/store/store';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { CogIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderProfile = () => {
  const { email, userData, isLogged, logout } = useUserStore();
  const {
    drexBalance,
    loading: drexLoading,
    refreshDrexBalance,
  } = useFetchDrexBalance(email);

  if (!isLogged || !userData) return <p>Loading...</p>;

  const formatwalletAddress = (walletAddress: string) => {
    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  };

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
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-purple-700 text-white rounded-lg p-2">
            <img
              src={
                'https://github.com/renancorreadev/loyahub/blob/develop/packages/loyahub-app/src/assets/images/realdigital.png?raw=true'
              }
              alt="Drex Icon"
              className="h-7 w-7"
            />
            <p className="text-sm font-bold">
              {drexBalance !== null ? `${drexBalance}` : 'N/A'}
            </p>
          </div>
        </div>
        <p className="text-lg tracking-tight text-slate-300 mb-1">
          Hello, {email ? formatUserName(email) : 'User'}
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
              Digital Wallet:{' '}
              <span className="font-mono">
                {formatwalletAddress(userData.walletAddress)}
              </span>
            </div>

            <MenuItem>
              {({ active }: { active: boolean }) => (
                <Link
                  to="/dashboard"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors duration-150 `}
                >
                  <div className="w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                      />
                    </svg>
                  </div>
                  Dashboard
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => logout()}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 transition-colors duration-150`}
                >
                  <div className="w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h6.75a2.25 2.25 0 002.25-2.25V15M18 12h-9m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </div>
                  Logout
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
