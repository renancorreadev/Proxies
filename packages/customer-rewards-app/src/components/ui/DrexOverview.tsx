import { Container } from '@/components/ui/Container';

export const DrexOverview: React.FC = () => {
  const drexBalance = 500;
  const drexInBRL = (drexBalance * 1).toFixed(2);

  return (
    <Container className="my-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Seu Saldo em Drex</h2>
      <p className="text-5xl font-semibold text-green-600 my-4">
        R$ {drexInBRL}
      </p>
      <p className="text-lg text-gray-500">
        O <strong>Drex</strong> é a nova moeda digital oficial do Brasil.
        Acumule pontos e converta em Drex para usá-lo como dinheiro real em
        diversas lojas parceiras.
      </p>
    </Container>
  );
};
