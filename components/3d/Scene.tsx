"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useCameraStore } from "@/lib/stores/cameraStore";
import { CameraController } from "@/components/3d/CameraController";
import { InteractionManager } from "@/components/3d/InteractionManager";
import { Lighting } from "@/components/3d/environment/Lighting";
import { Cubicle } from "@/components/3d/environment/Cubicle";
import { Desk } from "@/components/3d/environment/Desk";
import { Monitor } from "@/components/3d/objects/Monitor";
import { Keyboard } from "@/components/3d/objects/Keyboard";
import { Mouse } from "@/components/3d/objects/Mouse";
import { CoffeeMug } from "@/components/3d/objects/CoffeeMug";
import { DigitalClock } from "@/components/3d/objects/DigitalClock";
import { PostItNotes } from "@/components/3d/objects/PostItNotes";
import { PenPaper } from "@/components/3d/objects/PenPaper";
import { PhotoFrame } from "@/components/3d/objects/PhotoFrame";
import { DeskLamp } from "@/components/3d/objects/DeskLamp";
import { MonitorScreen } from "@/components/3d/objects/MonitorScreen";
import { CRTEffects } from "@/components/3d/effects/CRTEffects";
import { FocusModeHint } from "@/components/3d/ui/FocusModeHint";
import { LoadingScreen } from "@/components/3d/ui/LoadingScreen";
import { InteractionTooltip } from "@/components/3d/ui/InteractionTooltip";
import { QualitySettings } from "@/components/3d/ui/QualitySettings";
import { useSceneSettingsStore } from "@/lib/stores/sceneSettingsStore";

export function Scene3D() {
  const isFocusMode = useCameraStore((state) => state.isFocusMode);
  const quality = useSceneSettingsStore((state) => state.quality);
  const shadowsEnabled = quality !== "low";
  const dpr: [number, number] = quality === "high" ? [1.5, 2] : quality === "medium" ? [1, 2] : [1, 1.25];

  return (
    <div className="relative h-screen w-full bg-retro-black">
      <Canvas
        camera={{
          position: [0, 1.6, 0.1],
          fov: 75,
          near: 0.1,
          far: 50,
        }}
        shadows={shadowsEnabled}
        dpr={dpr}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Cubicle />
          <Desk />
          <Monitor />
          <Keyboard />
          <Mouse />
          <CoffeeMug />
          <DigitalClock />
          <PostItNotes />
          <PenPaper />
          <PhotoFrame />
          <DeskLamp />
          <MonitorScreen />

          <CameraController
            minPolarAngle={Math.PI / 2 - Math.PI / 6}
            maxPolarAngle={Math.PI / 2 + Math.PI / 6}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            sensitivity={0.002}
            smoothing={0.12}
          />

          <InteractionManager />
          <CRTEffects quality={quality} />
        </Suspense>
      </Canvas>

      <LoadingScreen />
      <InteractionTooltip />
      <QualitySettings />
      {isFocusMode ? <FocusModeHint /> : null}
    </div>
  );
}
