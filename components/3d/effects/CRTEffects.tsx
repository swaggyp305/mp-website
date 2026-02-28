"use client";

import { EffectComposer } from "@react-three/postprocessing";
import { CRTEffect } from "@/components/3d/effects/CRTEffect";
import { ScanlineEffect } from "@/components/3d/effects/ScanlineEffect";
import type { SceneQuality } from "@/lib/stores/sceneSettingsStore";

interface CRTEffectsProps {
  quality: SceneQuality;
}

export function CRTEffects({ quality }: CRTEffectsProps) {
  const scanlineOpacity = quality === "low" ? 0.05 : quality === "high" ? 0.1 : 0.08;
  const bloomIntensity = quality === "low" ? 0.06 : quality === "high" ? 0.2 : 0.12;

  if (quality === "low") {
    return (
      <EffectComposer>
        <ScanlineEffect opacity={scanlineOpacity} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <ScanlineEffect opacity={scanlineOpacity} />
      <CRTEffect bloomIntensity={bloomIntensity} />
    </EffectComposer>
  );
}

