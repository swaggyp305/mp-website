"use client";

export function Desk() {
  return (
    <group>
      <mesh position={[0, 0.74, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.08, 1.35]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.85} />
      </mesh>

      <mesh position={[-0.95, 0.37, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.74, 0.08]} />
        <meshStandardMaterial color="#D8D2C4" roughness={0.9} />
      </mesh>

      <mesh position={[0.95, 0.37, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.74, 0.08]} />
        <meshStandardMaterial color="#D8D2C4" roughness={0.9} />
      </mesh>

      <mesh position={[-0.95, 0.37, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.74, 0.08]} />
        <meshStandardMaterial color="#D8D2C4" roughness={0.9} />
      </mesh>

      <mesh position={[0.95, 0.37, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.74, 0.08]} />
        <meshStandardMaterial color="#D8D2C4" roughness={0.9} />
      </mesh>
    </group>
  );
}
