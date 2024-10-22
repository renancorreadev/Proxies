import { Container } from '@/components/ui/Container';

export const Hero: React.FC = () => (
  <Container className="flex flex-wrap items-center min-h-[80vh] bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600">
    <div className="w-full lg:w-1/2 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight mb-5">
        Recompensas e Drex: O Futuro das Finanças
      </h1>
      <p className="text-xl mb-6">
        Converta pontos em Drex, a moeda digital brasileira, e desbloqueie
        níveis como Premium, Gold e Titanium para maximizar seus ganhos!
      </p>
      <div className="flex space-x-6">
        <a
          href="#"
          className="px-6 py-3 bg-white text-indigo-600 rounded-lg shadow-lg"
        >
          Começar Agora
        </a>
        <a
          href="https://github.com/customer-rewards"
          target="_blank"
          className="text-gray-100 underline"
        >
          Ver no Github
        </a>
      </div>
    </div>
    <div className="w-full lg:w-1/2">
      <img
        src="./src/assets/images/hero.png"
        alt="Dashboard moderno"
        className="rounded-lg shadow-lg"
      />
    </div>
  </Container>
);
