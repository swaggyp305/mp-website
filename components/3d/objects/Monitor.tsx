"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function Monitor() {
  const monitorRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const casingColor = isHovered ? "#FBF5DE" : "#F5F5DC";

  useEffect(() => {
    if (!monitorRef.current) return;

    registerInteractiveObject("monitor", monitorRef.current, {
      onHover: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      tooltip: "Click to interact with monitor",
    });
    return () => unregisterInteractiveObject("monitor");
  }, []);

  return (
    <group ref={monitorRef} position={[0, 1.2, -0.5]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.4, 0.4]} />
        <meshStandardMaterial
          color={casingColor}
          roughness={0.7}
          metalness={0.1}
          emissive={isHovered ? "#2F2618" : "#000000"}
          emissiveIntensity={isHovered ? 0.12 : 0}
        />
      </mesh>

      <mesh position={[0, 0, 0.195]}>
        <boxGeometry args={[0.4, 0.32, 0.01]} />
        <meshStandardMaterial color="#D8D8D8" roughness={0.6} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0, 0.201]}>
        <planeGeometry args={[0.36, 0.27]} />
        <meshStandardMaterial
          color="#0D1014"
          roughness={0.1}
          metalness={0.15}
          emissive={isHovered ? "#0A0F17" : "#05070A"}
          emissiveIntensity={isHovered ? 0.08 : 0.04}
        />
      </mesh>

      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[0.355, 0.265]} />
        <meshStandardMaterial color="#111418" roughness={0.14} metalness={0.1} transparent opacity={0.92} />
      </mesh>

      <mesh position={[-0.14, -0.145, 0.202]}>
        <boxGeometry args={[0.11, 0.025, 0.004]} />
        <meshStandardMaterial color="#D7D7C4" roughness={0.62} metalness={0.05} />
      </mesh>

      <mesh position={[0.162, -0.146, 0.204]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 0.01, 18]} />
        <meshStandardMaterial color="#6F726E" roughness={0.45} metalness={0.06} />
      </mesh>

      {Array.from({ length: 7 }).map((_, index) => {
        const ventY = 0.11 - index * 0.035;
        return (
          <mesh key={`left-vent-${index}`} position={[-0.226, ventY, -0.02]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.003]} />
            <meshStandardMaterial color="#CECEBC" roughness={0.78} metalness={0.03} />
          </mesh>
        );
      })}

      {Array.from({ length: 7 }).map((_, index) => {
        const ventY = 0.11 - index * 0.035;
        return (
          <mesh key={`right-vent-${index}`} position={[0.226, ventY, -0.02]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.003]} />
            <meshStandardMaterial color="#CECEBC" roughness={0.78} metalness={0.03} />
          </mesh>
        );
      })}

      <mesh castShadow receiveShadow position={[0, -0.25, -0.02]}>
        <boxGeometry args={[0.08, 0.15, 0.12]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.7} metalness={0.08} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.35, -0.02]}>
        <boxGeometry args={[0.35, 0.03, 0.25]} />
        <meshStandardMaterial color="#E8D5C4" roughness={0.7} metalness={0.06} />
      </mesh>
    </group>
  );
}
