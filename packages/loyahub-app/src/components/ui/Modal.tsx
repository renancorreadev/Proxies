/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  footer,
  children,
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    {/** @ts-ignore */}
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      {/* Background overlay */}
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
      </Transition.Child>

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <MdClose size={24} />
            </button>

            {/* Título */}
            <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
              {title}
            </Dialog.Title>

            {/* Conteúdo */}
            <div className="mt-4">{children}</div>

            {/* Footer */}
            {footer && <div className="mt-6">{footer}</div>}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);
