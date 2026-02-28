"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { registerInteractiveObject, unregisterInteractiveObject } from "@/components/3d/InteractionManager";

export function PostItNotes() {
  const notesRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!notesRef.current) return;

    registerInteractiveObject("post-its", notesRef.current, {
      onHover: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      tooltip: "Post-it notes",
    });

    return () => unregisterInteractiveObject("post-its");
  }, []);

  return (
    <group ref={notesRef} position={[-0.72, 1.1, -1.48]}>
      <mesh rotation-y={0.18}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial color={isHovered ? "#FFF4A8" : "#FFE97A"} />
      </mesh>
      <mesh position={[0.14, -0.02, 0]} rotation-y={-0.16}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshStandardMaterial color={isHovered ? "#CBE9FF" : "#BCE0FF"} />
      </mesh>
    </group>
  );
}
