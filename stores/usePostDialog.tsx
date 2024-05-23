import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StoreProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const usePostDialog = create<StoreProps>((set) => ({
    open: false,
    setOpen: (value: boolean) => set({ open: value }),
}))