"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/lib/stores/cameraStore";

interface CameraControllerProps {
  minPolarAngle: number;
  maxPolarAngle: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  sensitivity: number;
  smoothing: number;
}

export function CameraController({
  minPolarAngle,
  maxPolarAngle,
  minAzimuthAngle,
  maxAzimuthAngle,
  sensitivity,
  smoothing,
}: CameraControllerProps) {
  const { camera } = useThree();
  const { isFocusMode, setRotation } = useCameraStore();

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const minPitch = minPolarAngle - Math.PI / 2;
    const maxPitch = maxPolarAngle - Math.PI / 2;

    const handleMouseMove = (event: MouseEvent) => {
      if (isFocusMode) return;

      targetRotation.current.y = THREE.MathUtils.clamp(
        targetRotation.current.y - event.movementX * sensitivity,
        minAzimuthAngle,
        maxAzimuthAngle
      );

      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x - event.movementY * sensitivity,
        minPitch,
        maxPitch
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFocusMode, maxAzimuthAngle, maxPolarAngle, minAzimuthAngle, minPolarAngle, sensitivity]);

  useFrame(() => {
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, smoothing);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, smoothing);

    camera.rotation.x = currentRotation.current.x;
    camera.rotation.y = currentRotation.current.y;
    camera.rotation.z = 0;

    setRotation(currentRotation.current.x, currentRotation.current.y);
  });

  return null;
}