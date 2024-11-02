import {
  Container,
  FeaturesSection,
  Hero,
  PointsOverview,
  SectionTitle,
} from '@/components/ui';
import { Benefits } from '@/components/ui/Benefits';
import React from 'react';

import { Faq } from '@/components/ui/Faq';
import Footer from '@/components/ui/Footer';

export const HomeContent: React.FC = () => {
  const tokenData = [
    {
      nft_type: 'CUSTOMER_PREMIUM',
      level_type: 1,
      description: 'Você está no nível I com a insígnia Customer Premium',
      created: '2024-10-17',
      updated: '2024-10-17',
      benefits: [
        { title: 'Desconto', description: 'Desconto de 10%' },
        {
          title: 'Frete Grátis',
          description: 'Frete grátis para todo o Brasil',
        },
        {
          title: 'Promoção Nível I',
          description: 'Acesso ao catálogo de promoção nível I',
        },
      ],
    },
    {
      nft_type: 'CUSTOMER_GOLD',
      level_type: 2,
      description: 'Você está no nível II com a insígnia Customer Gold',
      created: '2024-10-17',
      updated: '2024-10-17',
      benefits: [
        { title: 'Desconto', description: 'Desconto de 35%' },
        {
          title: 'Frete Grátis',
          description: 'Frete grátis para todo o Brasil',
        },
        {
          title: 'Promoção Nível II',
          description: 'Acesso ao catálogo de promoção nível II',
        },
        {
          title: 'Pontuação em Dobro',
          description: 'Pontuação em dobro em cada compra',
        },
      ],
    },
    {
      nft_type: 'CUSTOMER_TITANIUM',
      level_type: 3,
      description: 'Você está no nível III com a insígnia Customer Titanium',
      created: '2024-10-17',
      updated: '2024-10-17',
      benefits: [
        { title: 'Desconto', description: 'Desconto de 50%' },
        {
          title: 'Frete Grátis',
          description: 'Frete grátis para todo o Brasil',
        },
        {
          title: 'Promoção Nível III',
          description: 'Acesso ao catálogo de promoção nível III',
        },
        { title: 'Presente', description: 'Brindes exclusivos para clientes' },
        {
          title: 'Prioridade',
          description: 'Atendimento prioritário em trocas e pedidos',
        },
        {
          title: 'Aniversário',
          description: 'Ofertas especiais para aniversariantes',
        },
      ],
    },
  ];

  return (
    <div data-testid="home-content">
      <Hero />

      <FeaturesSection />

      <Benefits tokens={tokenData} />

      <PointsOverview />

      <Container>
        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>

        <Faq />
      </Container>

      <Footer />
    </div>
  );
};
