"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function Mouse() {
  const mouseRef = useRef<THREE.Group>(null);
  const targetYaw = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      targetYaw.current = normalizedX * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!mouseRef.current) return;
    mouseRef.current.rotation.y = THREE.MathUtils.lerp(mouseRef.current.rotation.y, targetYaw.current, 0.08);
  });

  useEffect(() => {
    if (!mouseRef.current) return;

    registerInteractiveObject("mouse", mouseRef.current, {
      onHover: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      tooltip: "Mouse (decorative)",
    });

    return () => unregisterInteractiveObject("mouse");
  }, []);

  return (
    <group ref={mouseRef} position={[0.3, 0.79, 0.19]}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.04, 0.08, 4, 10]} />
        <meshStandardMaterial color={isHovered ? "#F1EADA" : "#DFD8CA"} roughness={0.92} />
      </mesh>
    </group>
  );
}
