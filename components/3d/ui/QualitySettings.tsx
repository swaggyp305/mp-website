"use client";

import { useSceneSettingsStore, type SceneQuality } from "@/lib/stores/sceneSettingsStore";

const qualityOptions: SceneQuality[] = ["low", "medium", "high"];

export function QualitySettings() {
  const quality = useSceneSettingsStore((state) => state.quality);
  const setQuality = useSceneSettingsStore((state) => state.setQuality);

  return (
    <div className="absolute bottom-4 left-4 z-20 rounded border border-dark-brown bg-paper-bg px-2 py-1 text-xs text-dark-brown shadow-retro">
      <label className="flex items-center gap-2">
        Quality
        <select
          className="focus-ring rounded border border-dark-brown bg-cream px-1 py-0.5"
          value={quality}
          onChange={(event) => setQuality(event.target.value as SceneQuality)}
        >
          {qualityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}