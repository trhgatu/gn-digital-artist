"use client";

import { useRef, useEffect } from "react";
import { Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GothicComponent } from "@/shared/components/model/GothicComponent";

export function GothicComponentScene() {
  const gothicCompRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame(() => {
    if (gothicCompRef.current) {
      // Smooth interpolation using MathUtils
      const p = scrollProgress.current;

      // Move from center (0) to left (-1.8) on X, slightly down on Y
      const targetX = THREE.MathUtils.lerp(0, -1.8, p);
      const targetY = THREE.MathUtils.lerp(0, -0.2, p);

      // Scale from 0.45 in Hero to 0.6 in About
      const targetScale = THREE.MathUtils.lerp(0.45, 0.6, p);
      // Rotation interpolation (Optional extra cinematic spin)
      const targetRotZ = THREE.MathUtils.lerp(0, Math.PI / 6, p); // slight tilt

      gothicCompRef.current.position.set(targetX, targetY, 0);
      gothicCompRef.current.scale.setScalar(targetScale);
      gothicCompRef.current.rotation.z = targetRotZ;
    }
  });

  return (
    <group ref={gothicCompRef}>
      <Float speed={2} floatIntensity={1} floatingRange={[0.1, 0.1]}>
        <Center position={[0, 0, 0]}>
          <GothicComponent scale={[1, 1, 1]} rotation={[0, Math.PI, 0]} />
        </Center>
      </Float>
    </group>
  );
}
