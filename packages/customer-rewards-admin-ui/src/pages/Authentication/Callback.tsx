// Callback.tsx
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';

export function Callback() {
  const { search } = useLocation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const username = searchParams.get('username') as string;
    const password = searchParams.get('password') as string;

    if (username && password) {
      login(username, password)
        .then(() => navigate('/'))
        .catch(() => navigate('/login'));
    } else {
      navigate('/login');
    }
  }, [search, login, navigate]);

  return <div>Processing login...</div>;
}
