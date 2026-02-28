"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { BootSequence } from "@/components/3d/ui/BootSequence";

interface LoadingScreenProps {
  minimumMs?: number;
}

export function LoadingScreen({ minimumMs = 900 }: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const [allowDismiss, setAllowDismiss] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAllowDismiss(true), minimumMs);
    return () => window.clearTimeout(timer);
  }, [minimumMs]);

  const visible = active || !allowDismiss;
  const progressLabel = useMemo(() => `${Math.round(progress)}%`, [progress]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-retro-black/90">
      <div className="w-[360px] rounded border-2 border-retro-gray bg-cream p-5 font-mono text-dark-brown shadow-retro">
        <p className="text-lg font-semibold">Booting Portfolio.exe</p>
        <p className="mt-1 text-xs">Initializing CRT workstation...</p>
        <div className="mt-3">
          <BootSequence progress={progress} />
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded border border-dark-brown bg-paper-bg">
          <div className="h-full bg-green-crt transition-all duration-200" style={{ width: `${Math.max(8, progress)}%` }} />
        </div>
        <p className="mt-2 text-right text-xs">{progressLabel}</p>
      </div>
    </div>
  );
}