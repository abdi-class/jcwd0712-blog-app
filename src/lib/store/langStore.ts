import { create } from "zustand";

interface ILangState {
  lang: "en" | "id";
  setLang: (lang: "en" | "id") => void;
}

export const useLangStore = create<ILangState>((set) => {
  return {
    lang: "en",
    setLang: (lang) => set({ lang }),
  };
});
