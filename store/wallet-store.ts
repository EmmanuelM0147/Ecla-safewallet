import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WalletType = 'new' | 'imported';

interface Wallet {
  id: string;
  name: string;
  address: string;
  type: WalletType;
  createdAt: number;
}

interface WalletState {
  wallet: Wallet | null;
  isCreating: boolean;
  error: string | null;
  createWallet: (name: string) => Promise<void>;
  importWallet: (privateKey: string, name: string) => Promise<void>;
  clearWallet: () => void;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallet: null,
      isCreating: false,
      error: null,
      
      createWallet: async (name: string) => {
        set({ isCreating: true, error: null });
        
        try {
          // In a real app, this would create a wallet using a crypto library
          // For demo purposes, we'll simulate wallet creation
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Generate mock wallet data
          const wallet = {
            id: `wallet_${Math.random().toString(36).substr(2, 9)}`,
            name,
            address: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            type: 'new' as WalletType,
            createdAt: Date.now(),
          };
          
          set({ wallet, isCreating: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create wallet', 
            isCreating: false 
          });
        }
      },
      
      importWallet: async (privateKey: string, name: string) => {
        set({ isCreating: true, error: null });
        
        try {
          // In a real app, this would import a wallet using the provided private key
          // For demo purposes, we'll simulate wallet import
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Validate private key (simple validation for demo)
          if (!privateKey || privateKey.length < 32) {
            throw new Error('Invalid private key');
          }
          
          // Generate mock wallet data
          const wallet = {
            id: `wallet_${Math.random().toString(36).substr(2, 9)}`,
            name,
            address: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            type: 'imported' as WalletType,
            createdAt: Date.now(),
          };
          
          set({ wallet, isCreating: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to import wallet', 
            isCreating: false 
          });
        }
      },
      
      clearWallet: () => {
        set({ wallet: null });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        wallet: state.wallet,
      }),
    }
  )
);