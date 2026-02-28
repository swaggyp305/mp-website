"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function CoffeeMug() {
  const mugRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSteam, setShowSteam] = useState(false);

  useEffect(() => {
    if (!mugRef.current) return;

    registerInteractiveObject("coffee-mug", mugRef.current, {
      onClick: () => {
        setClickCount((value) => value + 1);
        setShowSteam(true);
        window.setTimeout(() => setShowSteam(false), 2200);
      },
      onHover: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      tooltip: "Coffee mug (click for steam)",
    });

    return () => unregisterInteractiveObject("coffee-mug");
  }, []);

  const mugColor = useMemo(() => {
    if (clickCount > 0 && clickCount % 5 === 0) {
      return "#FFBF00";
    }
    return isHovered ? "#EFE7D6" : "#E1D8C6";
  }, [clickCount, isHovered]);

  return (
    <group ref={mugRef} position={[-0.35, 0.81, 0.17]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.055, 0.06, 0.11, 20, 1, true]} />
        <meshStandardMaterial color={mugColor} roughness={0.85} />
      </mesh>

      <mesh position={[0.065, 0.01, 0]} castShadow>
        <torusGeometry args={[0.02, 0.006, 10, 16]} />
        <meshStandardMaterial color={mugColor} roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.056, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.052, 20]} />
        <meshStandardMaterial color="#4B2E21" roughness={1} />
      </mesh>

      {showSteam ? (
        <>
          <mesh position={[-0.015, 0.14, 0]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.45} />
          </mesh>
          <mesh position={[0.015, 0.165, 0]}>
            <sphereGeometry args={[0.011, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
          </mesh>
        </>
      ) : null}
    </group>
  );
}
