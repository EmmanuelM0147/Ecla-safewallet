import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  id: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call to authenticate
          // For demo purposes, we'll simulate a successful login after a delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Validate email format
          if (!email || !/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Please enter a valid email address');
          }
          
          // Create a mock user
          const user = {
            email,
            id: `user_${Math.random().toString(36).substr(2, 9)}`,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred during login', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);