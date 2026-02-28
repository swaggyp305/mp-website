"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function Monitor() {
  const monitorRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

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
        <boxGeometry args={[0.95, 0.74, 0.12]} />
        <meshStandardMaterial
          color={isHovered ? "#F3ECDE" : "#E8E2D3"}
          roughness={0.9}
          emissive={isHovered ? "#2F2618" : "#000000"}
          emissiveIntensity={isHovered ? 0.22 : 0}
        />
      </mesh>

      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[0.78, 0.56]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      <mesh position={[0, -0.43, 0]} castShadow>
        <boxGeometry args={[0.2, 0.14, 0.08]} />
        <meshStandardMaterial color="#DBD4C6" roughness={0.9} />
      </mesh>

      <mesh position={[0, -0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.03, 0.28]} />
        <meshStandardMaterial color="#D5CEBF" roughness={0.9} />
      </mesh>

      <mesh position={[-0.34, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
      <mesh position={[-0.315, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#FF7F00" />
      </mesh>
      <mesh position={[-0.29, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#FFFF00" />
      </mesh>
      <mesh position={[-0.265, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#00FF00" />
      </mesh>
      <mesh position={[-0.24, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#0000FF" />
      </mesh>
      <mesh position={[-0.215, -0.31, 0.064]}>
        <circleGeometry args={[0.012, 18]} />
        <meshBasicMaterial color="#8B00FF" />
      </mesh>
    </group>
  );
}
