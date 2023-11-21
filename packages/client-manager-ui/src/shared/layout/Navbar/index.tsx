// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 flex text-white p-4 w-screen ">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/" className="text-black">
            ClientManagement
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/about">Sobre</Link>
          <Link href="/services">Serviços</Link>
          <Link href="/contact">Contato</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
