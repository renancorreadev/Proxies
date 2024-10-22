import { Container } from '@/components/ui/Container';

interface BenefitItem {
  title: string;
  description: string;
}

interface TokenBenefit {
  nft_type: string;
  level_type: number;
  description: string;
  created: string;
  updated: string;
  benefits: BenefitItem[];
}

interface BenefitsProps {
  tokens: TokenBenefit[];
}

export const Benefits = ({ tokens }: BenefitsProps) => (
  <Container>
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-indigo-500 bg-indigo-100 font-medium uppercase rounded-full shadow-sm">
            Benefícios por Nível
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight">
            Explore as vantagens de cada nível e maximize seus ganhos
          </h1>
          <p className="text-lg md:text-xl text-gray-500">
            A cada nível, você desbloqueia novos benefícios e aumenta sua
            capacidade de ganhar pontos Drex.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {tokens.map((token, index) => (
            <BenefitCard key={index} token={token} />
          ))}
        </div>
      </div>
    </section>
  </Container>
);

interface BenefitCardProps {
  token: TokenBenefit;
}

const BenefitCard = ({ token }: BenefitCardProps) => (
  <div className="p-8 bg-gray-100 rounded-2xl dark:bg-trueGray-800">
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">
      {token.description}
    </h2>
    <p className="text-gray-500 mb-4">
      NFT: <span className="font-semibold">{token.nft_type}</span>
    </p>
    <p className="text-gray-500 mb-4">
      Criado em: {new Date(token.created).toLocaleDateString()}
    </p>
    <p className="text-gray-500 mb-6">
      Última atualização: {new Date(token.updated).toLocaleDateString()}
    </p>
    <ul className="space-y-3">
      {token.benefits.map((benefit, index) => (
        <li key={index} className="flex items-start space-x-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-500 text-white rounded-full">
            ✓
          </span>
          <div>
            <h3 className="text-lg font-medium">{benefit.title}</h3>
            <p className="text-gray-500">{benefit.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
