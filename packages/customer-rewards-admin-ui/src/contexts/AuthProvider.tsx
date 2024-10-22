// Auth.Provider.tsx
import { decodeJwt, JWTPayload } from 'jose';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { apiURL } from '@/utils/keys';

type AuthContextProps = {
  auth: JWTPayload | null;
  isLogged: boolean;
  login: (username: string, password: string) => Promise<JWTPayload | void>;
  makeLogout: () => void;
  refreshAuth: () => Promise<void>;
};

const initContextData: AuthContextProps = {
  auth: null,
  isLogged: false,
  login: async () => {},
  makeLogout: () => {},
  refreshAuth: async () => {},
};

export const AuthContext = createContext(initContextData);

export const AuthProvider = (props: PropsWithChildren) => {
  const [data, setData] = useState<{ auth: JWTPayload | null; isLogged: boolean }>({
    auth: JSON.parse(localStorage.getItem('auth') || 'null'),
    isLogged: !!localStorage.getItem('auth'),
  });

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch(`${apiURL}/auth/keycloak/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const { access_token } = await response.json();
      const decodedToken = decodeJwt(access_token);

      localStorage.setItem('auth', JSON.stringify(decodedToken));
      setData({ auth: decodedToken, isLogged: true });

      return decodedToken;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const makeLogout = useCallback(async () => {
    try {
      const username = data.auth?.preferred_username;

      if (!username) {
        console.warn('Username not found in auth data.');
        return;
      }

      const response = await fetch(`${apiURL}/auth/keycloak/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        localStorage.removeItem('auth');
        setData({ auth: null, isLogged: false });
      } else {
        console.warn('Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [data.auth]);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/auth/keycloak/refresh`, { method: 'GET' });

      if (response.ok) {
        const { access_token } = await response.json();
        const decodedToken = decodeJwt(access_token);

        // Atualiza o token no localStorage e no estado
        localStorage.setItem('auth', JSON.stringify(decodedToken));
        setData({ auth: decodedToken, isLogged: true });
      } else {
        console.warn('Failed to refresh token. Keeping the current session.');
      }
    } catch (error) {
      console.error('Failed to refresh auth:', error);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const contextValue = useMemo(
    () => ({
      ...data,
      login,
      makeLogout,
      refreshAuth,
    }),
    [data, login, makeLogout, refreshAuth],
  );

  return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};
