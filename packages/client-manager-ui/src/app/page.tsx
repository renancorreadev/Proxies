import Navbar from "src/shared/layout/Navbar";
import { MainRegister } from "src/components/sections/MainRegister";
import { Footer } from "src/shared/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="w-full bg-slate-900 p-2 w-full">
        <nav className="flex text-white p-4 w-screen ">
          <div className="flex justify-around items-center w-full">
            <div className="text-lg font-semibold">
              <Link href="/" className="text-white">
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
      </div>

      <MainRegister />

      <Footer />
    </main>
  );
}
