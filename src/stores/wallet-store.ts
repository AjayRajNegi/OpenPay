import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WalletStore {
  public: string;
  chainHealth: boolean;
  isDevnet: boolean;
  transactionHistory: string[];

  addToHistory: (address: string) => void;
  toggleNetwork: () => void;
  toggleChainHealth: (health: boolean) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      public: "",
      isDevnet: true,
      chainHealth: true,
      transactionHistory: [],

      addToHistory: (address) =>
        set((state) => ({
          transactionHistory: [
            address,
            ...state.transactionHistory.filter((a) => a !== address),
          ],
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
