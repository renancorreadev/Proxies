// Logout.tsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';

export function Logout() {
  const { makeLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      makeLogout();
      navigate('/login');
    };

    performLogout();
  }, [makeLogout, navigate]);

  return <div>Logging out...</div>;
}
