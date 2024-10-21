import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
  exp: number;
}

interface UserState {
  token: string | null;
  email: string | null;
  isLogged: boolean;
  setUser: (email: string, token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
  checkLoginStatus: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  email: null,
  isLogged: false,

  setUser: (email, token) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    set({ email, token, isLogged: true });
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    set({ token: null, email: null, isLogged: false });
  },

  isTokenValid: () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: TokenPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        set({
          token,
          email: sessionStorage.getItem('email'),
          isLogged: true,
        });
        return true;
      }

      set({ isLogged: false });
      return false;
    } catch (error) {
      console.error('Error decoding token:', error);
      set({ isLogged: false });
      return false;
    }
  },

  checkLoginStatus: () => {
    const isValid = useUserStore.getState().isTokenValid();
    set({ isLogged: isValid });
  },
}));
