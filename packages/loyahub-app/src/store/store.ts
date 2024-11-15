import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from '@/helpers/api/customer-api';

interface TokenPayload {
  exp: number;
}

interface UserData {
  id: number;
  email: string;
  walletAddress: string;
  isAdmin: boolean;
  age: number;
  address: {
    Street: string;
    City: string;
    PostalCode: string;
    HouseNumber: string;
  };
  paymentStatus: number;
  username: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
  token: string | null;
  email: string | null;
  isLogged: boolean;
  userData: UserData | null;
  setUser: (email: string, token: string) => void;
  fetchUserData: () => Promise<void>;
  logout: () => void;
  isTokenValid: () => boolean;
  checkLoginStatus: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  email: null,
  isLogged: false,
  userData: null,

  setUser: (email, token) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    set({ email, token, isLogged: true });
    useUserStore.getState().fetchUserData();
  },

  fetchUserData: async () => {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    if (!email || !token) return;

    try {
      const response = await axios.get(
        `${apiUrl}/user/get/${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ userData: response.data });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      set({ userData: null });
    }
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    set({ token: null, email: null, isLogged: false, userData: null });
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
    if (isValid) {
      useUserStore.getState().fetchUserData();
    }
  },
}));
