"use client";

import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/lib/stores/cameraStore";
import { useInteractionStore } from "@/lib/stores/interactionStore";

type InteractiveHandlers = {
  mesh: THREE.Object3D;
  onClick?: () => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
  tooltip?: string;
};

const interactiveObjects = new Map<string, InteractiveHandlers>();

export function registerInteractiveObject(
  id: string,
  mesh: THREE.Object3D,
  handlers: Omit<InteractiveHandlers, "mesh">
) {
  interactiveObjects.set(id, { mesh, ...handlers });
}

export function unregisterInteractiveObject(id: string) {
  interactiveObjects.delete(id);
}

function findInteractiveId(intersectedObject: THREE.Object3D): string | null {
  for (const [id, data] of interactiveObjects.entries()) {
    let current: THREE.Object3D | null = intersectedObject;
    while (current) {
      if (current === data.mesh) {
        return id;
      }
      current = current.parent;
    }
  }
  return null;
}

export function InteractionManager() {
  const { camera } = useThree();
  const { isFocusMode, enterFocusMode, exitFocusMode } = useCameraStore();
  const setCursor = useInteractionStore((state) => state.setCursor);
  const setHovered = useInteractionStore((state) => state.setHovered);
  const clearHovered = useInteractionStore((state) => state.clearHovered);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  useEffect(() => {
    if (isFocusMode) {
      clearHovered();
      return;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      setCursor(event.clientX, event.clientY);
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const meshes = Array.from(interactiveObjects.values()).map((item) => item.mesh);
      const intersections = raycaster.intersectObjects(meshes, true);

      if (intersections.length === 0) {
        if (hoveredObject) {
          interactiveObjects.get(hoveredObject)?.onHoverEnd?.();
          setHoveredObject(null);
        }
        clearHovered();
        document.body.style.cursor = "crosshair";
        return;
      }

      const nextHovered = findInteractiveId(intersections[0].object);

      if (!nextHovered) return;

      if (nextHovered !== hoveredObject) {
        if (hoveredObject) {
          interactiveObjects.get(hoveredObject)?.onHoverEnd?.();
        }
        setHoveredObject(nextHovered);
        interactiveObjects.get(nextHovered)?.onHover?.();
      }

      const tooltip = interactiveObjects.get(nextHovered)?.tooltip ?? null;
      setHovered(nextHovered, tooltip);

      document.body.style.cursor = "pointer";
    };

    const handleClick = () => {
      if (!hoveredObject) return;
      if (hoveredObject === "monitor") {
        enterFocusMode();
      }
      interactiveObjects.get(hoveredObject)?.onClick?.();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [camera, clearHovered, enterFocusMode, hoveredObject, isFocusMode, setCursor, setHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFocusMode) {
        exitFocusMode();
        clearHovered();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearHovered, exitFocusMode, isFocusMode]);

  return null;
}
