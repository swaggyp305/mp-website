"use client";

export function PhotoFrame() {
  return (
    <group position={[-0.68, 0.86, -0.62]} rotation-y={0.3}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.16, 0.02]} />
        <meshStandardMaterial color="#7C5A3A" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[0.17, 0.12]} />
        <meshStandardMaterial color="#DDE9F5" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.09, -0.03]} rotation-x={-0.6}>
        <boxGeometry args={[0.03, 0.08, 0.01]} />
        <meshStandardMaterial color="#6B4E33" roughness={0.8} />
      </mesh>
    </group>
  );
}
