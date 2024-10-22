import { Container } from '@/components/ui/Container';

export const FeaturesSection = () => (
  <Container>
    <section className="py-24 md:pb-32 bg-white">
      <div className="container px-4 mx-auto">
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-indigo-500 bg-indigo-100 font-medium uppercase rounded-full shadow-sm">
            Recursos e Benefícios
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
            Descubra novas formas de recompensar e engajar seus clientes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Acompanhe seus pontos, recompensas e saldos em **Drex** diretamente
            pela plataforma. A cada nova conquista, seu nível e benefícios
            aumentam!
          </p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div
                  className={`inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white ${feature.bgColor} rounded-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Container>
);

const features = [
  {
    title: 'Acompanhe seu saldo de pontos e Drex',
    description:
      'Visualize o histórico de pontos acumulados e seu saldo em Drex, a moeda digital oficial do Brasil.',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    bgColor: 'bg-indigo-500',
  },
  {
    title: 'Ganhe recompensas por níveis',
    description:
      'Suba de nível: Premium, Gold e Titanium desbloqueiam bônus crescentes de Drex e benefícios exclusivos.',
    icon: (
      <svg
        width="22"
        height="22"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 2L2 20h16L10 2z" />
      </svg>
    ),
    bgColor: 'bg-green-500',
  },
  {
    title: 'Segurança com Blockchain',
    description:
      'Seus pontos e recompensas são gerenciados com contratos inteligentes no Hyperledger Besu, garantindo segurança total.',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0L24 7v14l-12 7L0 21V7z" />
      </svg>
    ),
    bgColor: 'bg-blue-500',
  },
  {
    title: 'Recompensas em lojas parceiras',
    description:
      'Utilize seus Drex em uma rede crescente de lojas e serviços parceiros, facilitando seu dia a dia.',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 4L2 20h20L12 4z" />
      </svg>
    ),
    bgColor: 'bg-yellow-500',
  },
  {
    title: 'Controle completo em seu painel',
    description:
      'Acompanhe seu progresso e histórico de recompensas diretamente no painel de cliente, disponível 24/7.',
    icon: (
      <svg
        width="20"
        height="20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 0L0 10h20L10 0z" />
      </svg>
    ),
    bgColor: 'bg-purple-500',
  },
  {
    title: 'Integração com APIs',
    description:
      'Conecte sua conta com outros serviços e plataformas por meio de nossas APIs abertas e documentadas.',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0l12 9-12 9-12-9 12-9z" />
      </svg>
    ),
    bgColor: 'bg-red-500',
  },
];
