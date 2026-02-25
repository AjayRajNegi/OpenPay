import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WalletStore {
  public: string;
  balance: number;
  isDevnet: boolean;
  isMerchant: boolean;
  chainHealth: boolean;
  revenueToday: number;
  transactionHistory: string[];

  toggleNetwork: () => void;
  updateBalance: (bal: number) => void;
  addToHistory: (address: string) => void;
  toggleChainHealth: (health: boolean) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      public: "",
      balance: 0,
      isDevnet: true,
      isMerchant: true,
      chainHealth: true,
      revenueToday: 0.45,
      transactionHistory: [],

      addToHistory: (address) =>
        set((state) => ({
          transactionHistory: [
            address,
            ...state.transactionHistory.filter((a) => a !== address),
          ],
        })),

      updateBalance: (bal) =>
        set(() => ({
          balance: bal,
        })),

      toggleNetwork: () => set((state) => ({ isDevnet: !state.isDevnet })),
      toggleChainHealth: (health) => set((state) => ({ chainHealth: health })),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
