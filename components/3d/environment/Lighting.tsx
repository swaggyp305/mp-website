"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} color="#E8DCC8" />
      <directionalLight
        position={[1.5, 3, 2]}
        intensity={0.85}
        color="#F0E8D8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 1.55, -0.35]} intensity={0.25} color="#FFF3D6" />
    </>
  );
}
