import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './shared';
import { HomeContent } from './pages/Home';

import { useUserStore } from '@/store/store';
import { Dashboard } from './pages/Dashboard';

import { HeaderProfile } from './shared/Header/HeaderProfile';
import { Register } from './pages/Register';

function App() {
  const { isLogged } = useUserStore();

  return (
    <Layout data-testid="layout">
      <Routes>
        <Route path="/" element={<HomeContent data-testid="home-content" />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={isLogged ? <HeaderProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLogged ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
