// Login.tsx
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';
import SignIn from './SignIn'; // Importa o seu formulário de SignIn

export function Login() {
  const { auth, login } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <h1 className="text-center">Login</h1>
      {error && <p className="error-message text-center">{error}</p>}
      <SignIn onSubmit={handleLogin} />
    </div>
  );
}
