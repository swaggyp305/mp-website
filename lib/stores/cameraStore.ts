import { create } from "zustand";

interface CameraStore {
  rotation: { x: number; y: number };
  isFocusMode: boolean;
  sensitivity: number;
  setRotation: (x: number, y: number) => void;
  enterFocusMode: () => void;
  exitFocusMode: () => void;
  setSensitivity: (value: number) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  rotation: { x: 0, y: 0 },
  isFocusMode: false,
  sensitivity: 0.002,

  setRotation: (x, y) => set({ rotation: { x, y } }),

  enterFocusMode: () => {
    set({ isFocusMode: true });
    if (typeof document !== "undefined") {
      document.body.style.cursor = "default";
    }
  },

  exitFocusMode: () => {
    set({ isFocusMode: false });
    if (typeof document !== "undefined") {
      document.body.style.cursor = "crosshair";
    }
  },

  setSensitivity: (value) => set({ sensitivity: value }),
}));