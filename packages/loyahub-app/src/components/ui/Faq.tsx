import { Container } from '@/components/ui/Container';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const faqData = [
  {
    question: 'O que é Drex e como ele funciona?',
    answer:
      'Drex é a moeda digital brasileira oficial, emitida pelo Banco Central. Ele pode ser usado como dinheiro em lojas e serviços parceiros, e você pode acumular Drex convertendo seus pontos ganhos na plataforma.',
  },
  {
    question: 'Como eu posso acumular pontos e alcançar níveis?',
    answer:
      'Você acumula pontos através de atividades e compras elegíveis. Os pontos podem ser trocados por benefícios exclusivos. Quanto mais pontos você acumular, maiores são suas chances de alcançar níveis como Customer Premium, Gold e Titanium.',
  },
  {
    question: 'Quais são os benefícios dos níveis Premium, Gold e Titanium?',
    answer:
      'Os níveis Premium, Gold e Titanium aumentam seus ganhos. Premium oferece 5% em bônus de Drex, Gold 10%, e Titanium oferece um bônus de 15%. Esses níveis também desbloqueiam recompensas e benefícios exclusivos.',
  },
  {
    question: 'Como o sistema garante a segurança dos meus pontos e Drex?',
    answer:
      'A plataforma utiliza contratos inteligentes na blockchain privada Hyperledger Besu, garantindo imutabilidade e segurança nas transações. Todas as transações são registradas de forma transparente e segura.',
  },
  {
    question:
      'O que acontece se eu perder pontos ou deixar de usar minha conta?',
    answer:
      'Os pontos acumulados não expiram, mas seu nível pode ser ajustado com base no uso contínuo. A plataforma permite visualizar seu histórico completo de pontos e atividades através do painel do cliente.',
  },
  {
    question: 'Quais tokens posso receber e como eles funcionam?',
    answer:
      'Você pode receber três tipos de tokens: CUSTOMER_PREMIUM, CUSTOMER_GOLD e CUSTOMER_TITANIUM. Cada token é um ERC1155 e representa seu nível de benefícios na plataforma.',
  },
  {
    question: 'Como posso usar meus Drex?',
    answer:
      'Seu saldo em Drex pode ser usado em qualquer loja ou serviço parceiro que aceite a moeda digital. Além disso, você pode visualizar o saldo equivalente em reais diretamente na plataforma.',
  },
  {
    question: 'Como funcionam os contratos inteligentes na plataforma?',
    answer:
      'Os contratos inteligentes garantem que todas as operações sejam automáticas e seguras. As funções de registro de clientes, acúmulo de pontos e emissão de tokens são gerenciadas automaticamente pelo código na blockchain.',
  },
  {
    question: 'Posso transferir meus Drex para outra pessoa?',
    answer:
      'No momento, a plataforma só permite o uso do Drex para benefícios próprios. A transferência entre contas pode ser habilitada em atualizações futuras.',
  },
  {
    question: 'O que acontece quando eu atinjo um novo nível?',
    answer:
      'Ao atingir um novo nível, o sistema emite automaticamente o token correspondente e remove o anterior, garantindo que você esteja sempre no nível mais atualizado. Isso é gerenciado pela função de queima e emissão de tokens nos contratos inteligentes.',
  },
  {
    question: 'Existe algum custo para usar a plataforma?',
    answer:
      'Não há custos para acumular pontos ou converter em Drex. No entanto, certas transações externas podem ter taxas associadas, dependendo das políticas das lojas parceiras.',
  },
  {
    question: 'Como faço para consultar meus pontos e recompensas?',
    answer:
      'Você pode acessar o painel do cliente e visualizar seu saldo de pontos, histórico de atividades, e recompensas disponíveis. A plataforma oferece uma interface simples e intuitiva para facilitar o acompanhamento.',
  },
  {
    question: 'Como os pontos são gerenciados e armazenados?',
    answer:
      'Os pontos são armazenados no contrato inteligente PointStorage e vinculados ao ID do cliente. Isso garante que seus pontos estejam sempre seguros e disponíveis para consulta.',
  },
  {
    question: 'O que é a função de “burn” e por que é usada?',
    answer:
      'A função de “burn” é usada para queimar tokens antigos quando você atinge um novo nível. Isso garante que você tenha apenas o token mais relevante ao seu nível atual, evitando duplicidades.',
  },
  {
    question:
      'Como posso garantir que meu pagamento foi registrado corretamente?',
    answer:
      'O status do pagamento é armazenado como um parâmetro no contrato CustomerManagementStorage. Você pode verificar o status diretamente no painel do cliente.',
  },
  {
    question: 'Posso integrar minha conta com outras plataformas?',
    answer:
      'Sim, oferecemos APIs públicas para integração com sistemas externos, facilitando a conexão com outros serviços e plataformas.',
  },
];

export const Faq: React.FC = () => (
  <Container className="max-w-2xl mx-auto mt-12">
    {faqData.map((item) => (
      <Disclosure key={item.question} as="div" className="mb-4">
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex justify-between px-4 py-4 text-left text-lg font-medium text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-200 focus-visible:ring-opacity-75">
              <span>{item.question}</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180' : ''
                } w-6 h-6 text-indigo-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600">
              {item.answer}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </Container>
);
