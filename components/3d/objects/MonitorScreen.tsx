"use client";

import { Html } from "@react-three/drei";
import { DesktopOS } from "@/components/monitor/DesktopOS";
import { useCameraStore } from "@/lib/stores/cameraStore";

export function MonitorScreen() {
  const isFocusMode = useCameraStore((state) => state.isFocusMode);

  return (
    <Html
      transform
      position={[0, 1.2, -0.435]}
      scale={0.00075}
      distanceFactor={1}
      style={{
        width: "1024px",
        height: "768px",
        pointerEvents: isFocusMode ? "auto" : "none",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-black p-3">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)" }} />
        <div className="relative h-full w-full overflow-hidden bg-cream">
          {isFocusMode ? (
            <DesktopOS />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-retro-black text-monitor-green">
              <div className="text-center font-mono">
                <p className="text-lg">Click monitor to enter focus mode</p>
                <p className="mt-2 text-xs opacity-80">Press ESC to return to camera</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Html>
  );
}
