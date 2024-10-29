import { HomeContent } from './pages/Home';
import Layout from './shared';

function App() {
  return (
    <Layout data-testid="layout">
      <HomeContent data-testid="home-content" />
    </Layout>
  );
}

export default App;
