import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './shared';
import { HomeContent } from './pages/Home';
import { Login } from './components/app/Authentication/Login';
import { UserProfile } from './components/app/User/UserProfile';
import { useUserStore } from '@/store/store';

function App() {
  const { isLogged } = useUserStore();

  return (
    <Router>
      <Layout data-testid="layout">
        <Routes>
          <Route
            path="/"
            element={<HomeContent data-testid="home-content" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={isLogged ? <UserProfile /> : <Navigate to="/login" />}
          />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
