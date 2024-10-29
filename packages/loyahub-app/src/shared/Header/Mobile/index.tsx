import React from 'react';
import { Login } from '@/components/app/Authentication/Login';
import { useUserStore } from '@/store/store';
import { UserProfile } from '@/components/app/User/UserProfile';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const HeaderMobile: React.FC = () => {
  const { email, token } = useUserStore();

  return (
    <header className="w-full bg-slate-950 p-4 flex items-center justify-between">
      {/* Logo e título */}
      <div className="flex items-center gap-4 bg-slate-200 rounded-3xl">
        <a href="/">
          <img
            src="./src/assets/images/logo.png"
            alt="Loyahub"
            className="w-12 h-12"
          />
        </a>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-slate-300">LoyaHub</h1>
      </div>
      {/* Menu para mobile */}
      <Menu as={'div'} className="relative">
        {({ open }: { open: boolean }) => (
          <>
            <MenuButton
              className="text-slate-300 focus:outline-none"
              aria-expanded={open}
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg">
              {/* Links principais */}
              <MenuItem>
                {({ active }: { active: boolean }) => (
                  <a
                    href="/about"
                    className={`${
                      active ? 'bg-slate-100' : ''
                    } block px-4 py-2 text-sm text-gray-700 rounded-md`}
                  >
                    Sobre Nós
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }: { active: boolean }) => (
                  <a
                    href="/services"
                    className={`${
                      active ? 'bg-slate-100' : ''
                    } block px-4 py-2 text-sm text-gray-700 rounded-md`}
                  >
                    Serviços
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }: { active: boolean }) => (
                  <a
                    href="/contact"
                    className={`${
                      active ? 'bg-slate-100' : ''
                    } block px-4 py-2 text-sm text-gray-700 rounded-md`}
                  >
                    Contato
                  </a>
                )}
              </MenuItem>

              {/* Login ou Perfil do Usuário */}
              <div className="border-t border-gray-200 mt-2">
                <MenuItem>
                  {({ active }: { active: boolean }) => (
                    <div
                      className={`${
                        active ? 'bg-slate-100' : ''
                      } px-4 py-2 rounded-md`}
                    >
                      {email && token ? <UserProfile /> : <Login />}
                    </div>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </>
        )}
      </Menu>
    </header>
  );
};
