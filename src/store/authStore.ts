import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  phone?: string;
  wallet?: number;
}

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  redirectPath: string | null;
  setUser: (user: User | null) => void;
  setAuthModal: (open: boolean, mode?: 'login' | 'register' | 'forgot', redirectPath?: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthModalOpen: false,
      authModalMode: 'login',
      redirectPath: null,
      setUser: (user) => set({ user }),
      setAuthModal: (open, mode = 'login', redirectPath = null) => 
        set({ isAuthModalOpen: open, authModalMode: mode, redirectPath }),
      login: async (email, password) => {
        // Admin Credentials
        if (email === 'admin' && password === 'hallo1234') {
          set({ 
            user: { 
              id: 'admin-1', 
              name: 'Administrator', 
              email: 'admin@trips.com', 
              role: 'admin',
              avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9aJdfomksLSUzsOIqf80Q7RnOoWR4IdTmqLKgBIy3NhEoaZVBBfmWouirf-woG3Vrq-PhjlhxTpqXWaWOpz57twV4k-oxGpl5DrY6Kd_IBmEBKNESuB03Y_1WkwMoG4xPNaJr0EI_DXCwbztXVU1kKvlrxBI3ej40FvJ-H1PKON-8ER7-IxPM8Pn5UnONN5rq9k5yct2XdcD4g-htatZ8igZemQg8Dk-_xDTlGclNl9C-s5ajUTjW0ZgDaYb493IUWwI1VoE8weE"
            } 
          });
          return true;
        }

        // Mock User Login
        if (email && password) {
          set({ user: { id: '1', name: 'User', email, role: 'user' } });
          return true;
        }
        return false;
      },
      register: async (email, password, name) => {
        // Mock Register Logic
        if (email && password && name) {
          set({ user: { id: '1', name, email, role: 'user' } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),

    {
      name: 'auth-storage',
    }
  )
);
