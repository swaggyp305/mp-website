"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/lib/stores/cameraStore";

export function Keyboard() {
  const keyboardRef = useRef<THREE.Group>(null);
  const [isPressed, setIsPressed] = useState(false);
  const isFocusMode = useCameraStore((state) => state.isFocusMode);

  useEffect(() => {
    const handleKeyDown = () => {
      if (!isFocusMode) return;
      setIsPressed(true);
    };

    const handleKeyUp = () => {
      if (!isFocusMode) return;
      setIsPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isFocusMode]);

  useFrame(() => {
    if (!keyboardRef.current) return;
    const targetY = isPressed ? 0.785 : 0.79;
    keyboardRef.current.position.y = THREE.MathUtils.lerp(keyboardRef.current.position.y, targetY, 0.2);
  });

  return (
    <group ref={keyboardRef} position={[0, 0.79, 0.08]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.04, 0.26]} />
        <meshStandardMaterial color={isPressed ? "#D8D0C1" : "#E4DDD0"} roughness={0.92} />
      </mesh>

      <mesh position={[0, 0.02, 0.04]}>
        <boxGeometry args={[0.65, 0.01, 0.16]} />
        <meshStandardMaterial color="#D0CABD" roughness={0.96} />
      </mesh>
    </group>
  );
}
