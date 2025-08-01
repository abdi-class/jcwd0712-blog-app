import { create } from "zustand";

interface IAccount {
  objectId: string;
  email: string;
  password: string;
}

interface IAccountStore {
  account: IAccount | null;
  setAccount: (account: IAccount) => void;
}

export const useAccountStore = create<IAccountStore>((set) => {
  return {
    account: null,
    setAccount: (account) => set({ account }),
  };
});
