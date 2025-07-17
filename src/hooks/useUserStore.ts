import { create } from "zustand";

interface UserState {
  isPro: boolean;
  setIsPro: (isPro: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isPro: false,
  setIsPro: (isPro) => set({ isPro }),
}));
