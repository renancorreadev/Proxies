import { Container } from '@/components/ui/Container';

export const PointsOverview: React.FC = () => {
  const points = 850;
  const nextLevel = 'Customer Titanium';

  return (
    <Container className="text-center my-12">
      <h2 className="text-3xl font-bold text-gray-800">Seu Saldo de Pontos</h2>
      <p className="text-5xl font-semibold text-indigo-600 my-4">
        {points} Pontos
      </p>
      <p className="text-lg text-gray-500">
        Acumule mais <strong>150 pontos</strong> para atingir o nível{' '}
        <span className="text-indigo-700 font-bold">{nextLevel}</span>.
      </p>
    </Container>
  );
};
