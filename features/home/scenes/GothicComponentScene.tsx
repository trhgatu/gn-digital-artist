import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useGothicRingAnimation } from "../hooks/useGothicRingAnimation";

export function GothicComponentScene() {
  const gothicCompRef = useRef<THREE.Group>(null);
  useGothicRingAnimation(gothicCompRef);

  const { nodes, materials } = useGLTF("/models/gothic_ring.glb");

  const fallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a0303",
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  );
  useEffect(() => {
    return () => fallbackMaterial.dispose();
  }, [fallbackMaterial]);

  return (
    <group ref={gothicCompRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Object_2 as THREE.Mesh).geometry}
        material={materials["null"] || fallbackMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/gothic_ring.glb");
