"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function DeskLamp() {
  const lampRef = useRef<THREE.Group>(null);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (!lampRef.current) return;
    registerInteractiveObject("desk-lamp", lampRef.current, {
      onClick: () => setIsOn((value) => !value),
      tooltip: "Desk lamp (click to toggle)",
    });
    return () => unregisterInteractiveObject("desk-lamp");
  }, []);

  return (
    <group ref={lampRef} position={[0.55, 0.79, -0.22]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.02, 20]} />
        <meshStandardMaterial color="#CFC8BA" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 12]} />
        <meshStandardMaterial color="#BAB2A3" roughness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.23, 0]} rotation-z={-0.5} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 12]} />
        <meshStandardMaterial color="#BAB2A3" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.28, 0]} rotation-z={-0.35} castShadow>
        <coneGeometry args={[0.055, 0.11, 20]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} emissive={isOn ? "#FFD38A" : "#000000"} emissiveIntensity={isOn ? 0.35 : 0} />
      </mesh>
      {isOn ? <pointLight position={[0.14, 0.25, 0]} intensity={0.35} distance={1.8} color="#FFE5B4" /> : null}
    </group>
  );
}
