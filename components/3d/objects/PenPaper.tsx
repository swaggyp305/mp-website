"use client";

export function PenPaper() {
  return (
    <group position={[0.58, 0.79, 0.02]}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[0.34, 0.24]} />
        <meshStandardMaterial color="#FFFEF0" roughness={1} />
      </mesh>

      <mesh position={[0.04, 0.01, 0.02]} rotation-z={-0.55} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.17, 10]} />
        <meshStandardMaterial color="#204A87" roughness={0.55} metalness={0.1} />
      </mesh>

      <mesh position={[-0.025, 0.01, -0.03]} rotation-z={-0.55} castShadow>
        <coneGeometry args={[0.006, 0.02, 10]} />
        <meshStandardMaterial color="#D4B483" roughness={0.8} />
      </mesh>
    </group>
  );
}
