import { create } from "zustand";

interface InteractionStore {
  hoveredObjectId: string | null;
  hoveredTooltip: string | null;
  cursor: { x: number; y: number };
  setHovered: (id: string | null, tooltip: string | null) => void;
  setCursor: (x: number, y: number) => void;
  clearHovered: () => void;
}

export const useInteractionStore = create<InteractionStore>((set) => ({
  hoveredObjectId: null,
  hoveredTooltip: null,
  cursor: { x: 0, y: 0 },

  setHovered: (id, tooltip) => set({ hoveredObjectId: id, hoveredTooltip: tooltip }),
  setCursor: (x, y) => set({ cursor: { x, y } }),
  clearHovered: () => set({ hoveredObjectId: null, hoveredTooltip: null }),
}));