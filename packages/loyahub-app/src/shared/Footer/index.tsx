import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo e Descrição */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
            Loyahub
          </h2>
          <p className="text-gray-400 text-sm">
            Construindo o futuro da blockchain com inovação e tecnologia.
          </p>
        </div>

        {/* Links de Navegação */}
        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Recursos
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  Tutoriais
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Suporte
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ícones de Redes Sociais */}
        <div className="flex gap-4">
          <a
            href="#"
            className="p-2 bg-gray-700 hover:bg-green-500 text-white rounded-full transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-700 hover:bg-green-500 text-white rounded-full transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-700 hover:bg-green-500 text-white rounded-full transition-colors"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-700 hover:bg-green-500 text-white rounded-full transition-colors"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} Sua Empresa. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};
