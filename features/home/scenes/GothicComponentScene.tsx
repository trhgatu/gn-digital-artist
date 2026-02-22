"use client";

import { useRef } from "react";
import { Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { GothicComponent } from "@/shared/components/model/GothicComponent";

export function GothicComponentScene() {
  const gothicCompRef = useRef<THREE.Group>(null);
  return (
    <group ref={gothicCompRef}>
      <Float speed={2} floatIntensity={1} floatingRange={[0.1, 0.1]}>
        <Center>
          <GothicComponent scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI, 0]} />
        </Center>
      </Float>
    </group>
  );
}
