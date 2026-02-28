"use client";

export function Cubicle() {
  return (
    <group>
      <mesh position={[-1.8, 1.1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 2.2, 3.2]} />
        <meshStandardMaterial color="#C7C2B8" roughness={0.95} />
      </mesh>

      <mesh position={[1.8, 1.1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 2.2, 3.2]} />
        <meshStandardMaterial color="#C7C2B8" roughness={0.95} />
      </mesh>

      <mesh position={[0, 1.1, -1.55]} receiveShadow>
        <boxGeometry args={[3.7, 2.2, 0.1]} />
        <meshStandardMaterial color="#BEB9AE" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#8A8D90" roughness={1} />
      </mesh>
    </group>
  );
}
