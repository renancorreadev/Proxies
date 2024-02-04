import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}

interface UserState {
  token: string | null;
  email: string | null;
  setUser: (email: string, token: string) => void;
  isTokenValid: () => boolean;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  email: null,
  setUser: (email, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
    set({ email, token });
  },

  isTokenValid: () => {
    const token = sessionStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded: TokenPayload = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        set({ token, email: sessionStorage.getItem("email") });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  },
}));
