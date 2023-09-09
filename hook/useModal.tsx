"use client";
import { create } from "zustand";
export type ModalType = {
  isOpen?: boolean;
  show: (elem: JSX.Element) => void;
  close: () => void;
  content?: JSX.Element;
};

export const useModal = create<ModalType>((set) => ({
  isOpen: false,
  show: (element: JSX.Element) => set({ isOpen: true, content: element }),
  close: () => set({ isOpen: false }),
}));
