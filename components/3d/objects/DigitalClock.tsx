"use client";

import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";

function getClockText() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function DigitalClock() {
  const [timeText, setTimeText] = useState(getClockText);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeText(getClockText()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <group position={[0.72, 0.82, -0.7]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.09, 0.08]} />
        <meshStandardMaterial color="#2B2B2B" roughness={0.8} />
      </mesh>
      <Html transform position={[0, 0, 0.042]} distanceFactor={0.25} center style={{ width: "180px" }}>
        <div className="rounded-sm bg-black/90 px-2 py-1 text-center font-mono text-[20px] text-monitor-green">
          {timeText}
        </div>
      </Html>
    </group>
  );
}
