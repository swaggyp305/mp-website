"use client";

import { Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface ScanlineEffectProps {
  opacity?: number;
}

export function ScanlineEffect({ opacity = 0.08 }: ScanlineEffectProps) {
  return <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={opacity} />;
}
