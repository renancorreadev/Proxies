// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/">
            ClientManagement
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/about">
          Sobre
          </Link>
          <Link href="/services">
          Serviços
          </Link>
          <Link href="/contact">
          Contato
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
