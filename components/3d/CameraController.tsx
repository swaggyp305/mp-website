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
  const normalizedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const minPitch = minPolarAngle - Math.PI / 2;
    const maxPitch = maxPolarAngle - Math.PI / 2;
    const deadZone = 0.06;

    const applyDeadZone = (value: number) => {
      if (Math.abs(value) < deadZone) return 0;
      return (value - Math.sign(value) * deadZone) / (1 - deadZone);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isFocusMode) return;

      const viewportX = window.innerWidth / 2;
      const viewportY = window.innerHeight / 2;

      const rawX = (event.clientX - viewportX) / viewportX;
      const rawY = (event.clientY - viewportY) / viewportY;

      normalizedMouse.current.x = THREE.MathUtils.clamp(applyDeadZone(rawX), -1, 1);
      normalizedMouse.current.y = THREE.MathUtils.clamp(applyDeadZone(rawY), -1, 1);

      targetRotation.current.y = THREE.MathUtils.clamp(
        -normalizedMouse.current.x * maxAzimuthAngle,
        minAzimuthAngle,
        maxAzimuthAngle
      );

      targetRotation.current.x = THREE.MathUtils.clamp(
        -normalizedMouse.current.y * Math.max(Math.abs(minPitch), Math.abs(maxPitch)),
        minPitch,
        maxPitch
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFocusMode, maxAzimuthAngle, maxPolarAngle, minAzimuthAngle, minPolarAngle, sensitivity]);

  useFrame((_, delta) => {
    const targetZ = isFocusMode ? -0.3 : 0.1;
    const targetX = 0;
    const targetY = 1.6;

    if (isFocusMode) {
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
      normalizedMouse.current.x = 0;
      normalizedMouse.current.y = 0;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);

    const adaptiveSmoothing = THREE.MathUtils.clamp(smoothing + sensitivity * 10, 0.02, 0.2);
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, smoothing);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, adaptiveSmoothing);

    camera.rotation.x = currentRotation.current.x;
    camera.rotation.y = currentRotation.current.y;
    camera.rotation.z = 0;

    setRotation(currentRotation.current.x, currentRotation.current.y);
  });

  return null;
}