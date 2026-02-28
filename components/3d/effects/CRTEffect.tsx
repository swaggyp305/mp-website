"use client";

import { Bloom, Vignette } from "@react-three/postprocessing";

interface CRTEffectProps {
  bloomIntensity?: number;
}

export function CRTEffect({ bloomIntensity = 0.12 }: CRTEffectProps) {
  return (
    <>
      <Bloom intensity={bloomIntensity} luminanceThreshold={0.15} luminanceSmoothing={0.35} />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
    </>
  );
}
