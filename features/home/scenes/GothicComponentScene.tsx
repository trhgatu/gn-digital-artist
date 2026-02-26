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

  // Helper function to map a value from one range to another
  const mapRange = (
    val: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => {
    if (inMin === inMax) return outMin;
    return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

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

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame(() => {
    if (gothicCompRef.current) {
      const p = scrollProgress.current;

      let targetX = 0,
        targetY = 0,
        targetZ = 0;
      let targetScale = 0.45;
      let targetRotX = 0,
        targetRotY = 0,
        targetRotZ = 0;

      // The total scroll distance is roughly 600vh (100vh Hero + 100vh About + 300vh Gallery Pin + 100vh Pact).
      // 0.0 - 0.166 roughly equals scrolling 100vh from top of Hero to About perfectly filling the screen.

      // 0.0 - 0.166: Transition Hero to About
      if (p <= 0.166) {
        // Small 2% deadzone at the absolute top
        let localP = mapRange(p, 0.02, 0.166, 0, 1);
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1); // Ease-in-out

        targetX = THREE.MathUtils.lerp(0, -1.8, smoothP);
        targetY = THREE.MathUtils.lerp(0, -0.2, smoothP);
        targetScale = THREE.MathUtils.lerp(0.45, 0.6, smoothP);
        targetRotZ = THREE.MathUtils.lerp(0, Math.PI / 6, smoothP);
        targetRotY = THREE.MathUtils.lerp(0, Math.PI / 4, smoothP);
      }
      // 0.166 - 0.333: Transition About to Gallery (Hide)
      else if (p <= 0.333) {
        let localP = mapRange(p, 0.166, 0.333, 0, 1);
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

        targetX = THREE.MathUtils.lerp(-1.8, -5, smoothP);
        targetY = THREE.MathUtils.lerp(-0.2, 2, smoothP);
        targetZ = THREE.MathUtils.lerp(0, -5, smoothP);
        targetScale = THREE.MathUtils.lerp(0.6, 0.2, smoothP);
        targetRotZ = Math.PI / 6;
        targetRotY = Math.PI / 4;
      }
      // 0.333 - 0.833: Inside Gallery (Idle spin)
      else if (p <= 0.833) {
        targetX = -5;
        targetY = 2;
        targetZ = -5;
        targetScale = 0.2;
        targetRotZ = Math.PI / 6;

        // Spin continuously based on progress
        const localP = mapRange(p, 0.333, 0.833, 0, 1);
        targetRotY = Math.PI / 4 + localP * Math.PI * 4;
      }
      // 0.833 - 1.0: Descend into The Pact
      else {
        let localP = mapRange(p, 0.833, 1.0, 0, 1);
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

        // Final Gallery Rotation State
        const startRotY = Math.PI / 4 + Math.PI * 4;

        targetX = THREE.MathUtils.lerp(-5, 0, smoothP);
        targetY = THREE.MathUtils.lerp(2, 0, smoothP);
        targetZ = THREE.MathUtils.lerp(-5, -1, smoothP);
        targetScale = THREE.MathUtils.lerp(0.2, 0.7, smoothP);

        targetRotX = THREE.MathUtils.lerp(0, Math.PI / 12, smoothP);
        targetRotZ = THREE.MathUtils.lerp(Math.PI / 6, 0, smoothP);
        targetRotY = THREE.MathUtils.lerp(
          startRotY,
          startRotY + Math.PI,
          smoothP,
        );
      }

      // Smoothly interpolate current values towards target values to avoid snapping
      gothicCompRef.current.position.x = THREE.MathUtils.lerp(
        gothicCompRef.current.position.x,
        targetX,
        0.1,
      );
      gothicCompRef.current.position.y = THREE.MathUtils.lerp(
        gothicCompRef.current.position.y,
        targetY,
        0.1,
      );
      gothicCompRef.current.position.z = THREE.MathUtils.lerp(
        gothicCompRef.current.position.z,
        targetZ,
        0.1,
      );

      const currentScale = gothicCompRef.current.scale.x;
      gothicCompRef.current.scale.setScalar(
        THREE.MathUtils.lerp(currentScale, targetScale, 0.1),
      );

      gothicCompRef.current.rotation.x = THREE.MathUtils.lerp(
        gothicCompRef.current.rotation.x,
        targetRotX,
        0.1,
      );
      gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
        gothicCompRef.current.rotation.y,
        targetRotY,
        0.1,
      );
      gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
        gothicCompRef.current.rotation.z,
        targetRotZ,
        0.1,
      );
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
