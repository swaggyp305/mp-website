import { create } from "zustand";

export type SceneQuality = "low" | "medium" | "high";

interface SceneSettingsStore {
  quality: SceneQuality;
  setQuality: (quality: SceneQuality) => void;
}

export const useSceneSettingsStore = create<SceneSettingsStore>((set) => ({
  quality: "medium",
  setQuality: (quality) => set({ quality }),
}));
