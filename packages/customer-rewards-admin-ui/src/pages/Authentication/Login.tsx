import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';
import { makeLoginUrl } from '../../contexts/utils';

export function Login() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      window.location.href = makeLoginUrl();
    }
  }, [auth]);

  return auth ? <Navigate to="/" /> : <div>Loading...</div>;
}
