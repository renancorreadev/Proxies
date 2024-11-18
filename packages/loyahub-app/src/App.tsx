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

/** Fonts  */
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { ModalProvider } from './context/modal-provider';

function App() {
  const { isLogged } = useUserStore();

  return (
    <ModalProvider>
      <Layout data-testid="layout">
        <Routes>
          <Route
            path="/"
            element={<HomeContent data-testid="home-content" />}
          />
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
    </ModalProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
