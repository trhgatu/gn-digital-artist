import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

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

export const RING_STAGES = {
  HERO: {
    X: 0,
    Y: -0.6,
    Z: 0,
    SCALE: 0.4,
    ROT_X: 0,
    ROT_Y: Math.PI,
    ROT_Z: 0,
  },
  ABOUT: {
    X: -1.8,
    Y: -0.2,
    Z: 0,
    SCALE: 0.8,
    ROT_X: 0,
    ROT_Y: 0,
  },
  GALLERY_BASE: {
    Y: 2,
    Z: -4,
    SCALE: 0.6,
    ROT_Z: Math.PI / 6,
  },
  GALLERY_ROW_1_LEFT: {
    X: -2.5,
    Z: -3,
  },
  GALLERY_ROW_1_RIGHT: {
    X: 3.5,
    Z: -5,
  },
  GALLERY_ROW_2_LEFT: {
    X: -3.5,
    Z: -5,
  },
  GALLERY_ROW_3_LEFT: {
    X: -3.5,
    Z: -5,
  },
  GALLERY_ROW_3_CENTER: {
    X: -2,
    Z: -3,
  },
  PACT: {
    X: 0,
    Y: 0,
    Z: -3,
    SCALE: 1.0,
    ROT_X: Math.PI / 12,
    ROT_Z: 0,
  },
};

export const SCROLL_MARKERS = {
  HERO_END: 0.166,
  ABOUT_END: 0.333,
  GALLERY_ROW_1_END: 0.5,
  GALLERY_ROW_2_END: 0.666,
  GALLERY_ROW_3_END: 0.833,
  GALLERY_R1_START_SWEEP: 0.4,
  GALLERY_R2_START_SWEEP: 0.55,
  GALLERY_R3_START_SWEEP: 0.7,
} as const;

export function useGothicRingAnimation(
  gothicCompRef: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>,
) {
  // Cache scroll progress outside useFrame to avoid per-frame DOM reads
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current =
        maxScroll > 0
          ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
          : 0;
    };
    // Set initial value
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useFrame((state) => {
    if (!gothicCompRef.current) return;

    const p = scrollProgressRef.current;

    let targetX = RING_STAGES.HERO.X;
    // Subtle vertical floating effect based on time
    let targetY =
      RING_STAGES.HERO.Y + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    let targetZ = RING_STAGES.HERO.Z;
    let targetScale = RING_STAGES.HERO.SCALE;

    // Subtle tilting float instead of continuous spin
    let targetRotX =
      RING_STAGES.HERO.ROT_X + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    let targetRotY = RING_STAGES.HERO.ROT_Y;
    let targetRotZ = RING_STAGES.HERO.ROT_Z;

    if (p <= SCROLL_MARKERS.HERO_END) {
      let localP = mapRange(p, 0, SCROLL_MARKERS.HERO_END, 0, 1);
      localP = THREE.MathUtils.clamp(localP, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

      targetX = THREE.MathUtils.lerp(
        RING_STAGES.HERO.X,
        RING_STAGES.ABOUT.X,
        smoothP,
      );
      targetY = THREE.MathUtils.lerp(
        RING_STAGES.HERO.Y,
        RING_STAGES.ABOUT.Y,
        smoothP,
      );
      targetScale = THREE.MathUtils.lerp(
        RING_STAGES.HERO.SCALE,
        RING_STAGES.ABOUT.SCALE,
        smoothP,
      );
    } else if (p <= SCROLL_MARKERS.ABOUT_END) {
      let localP = mapRange(
        p,
        SCROLL_MARKERS.HERO_END,
        SCROLL_MARKERS.ABOUT_END,
        0,
        1,
      );
      localP = THREE.MathUtils.clamp(localP, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

      targetX = THREE.MathUtils.lerp(
        RING_STAGES.ABOUT.X,
        RING_STAGES.GALLERY_ROW_1_LEFT.X,
        smoothP,
      );
      targetY = THREE.MathUtils.lerp(
        RING_STAGES.ABOUT.Y,
        RING_STAGES.GALLERY_BASE.Y,
        smoothP,
      );
      targetZ = THREE.MathUtils.lerp(
        RING_STAGES.ABOUT.Z,
        RING_STAGES.GALLERY_BASE.Z,
        smoothP,
      );
      targetScale = THREE.MathUtils.lerp(
        RING_STAGES.ABOUT.SCALE,
        RING_STAGES.GALLERY_BASE.SCALE,
        smoothP,
      );

      targetRotZ = RING_STAGES.GALLERY_BASE.ROT_Z;
      targetRotY = Math.PI / 4;
    } else if (p <= SCROLL_MARKERS.GALLERY_ROW_3_END) {
      const galleryP = mapRange(
        p,
        SCROLL_MARKERS.ABOUT_END,
        SCROLL_MARKERS.GALLERY_ROW_3_END,
        0,
        1,
      );

      targetRotY = Math.PI / 4 + galleryP * Math.PI * 4;
      targetRotZ = RING_STAGES.GALLERY_BASE.ROT_Z;
      targetY = RING_STAGES.GALLERY_BASE.Y;
      targetScale = RING_STAGES.GALLERY_BASE.SCALE;

      if (p <= SCROLL_MARKERS.GALLERY_ROW_1_END) {
        let localP = mapRange(
          p,
          SCROLL_MARKERS.GALLERY_R1_START_SWEEP,
          SCROLL_MARKERS.GALLERY_ROW_1_END,
          0,
          1,
        );
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

        targetX = THREE.MathUtils.lerp(
          RING_STAGES.GALLERY_ROW_1_LEFT.X,
          RING_STAGES.GALLERY_ROW_1_RIGHT.X,
          smoothP,
        );
        targetZ = THREE.MathUtils.lerp(
          RING_STAGES.GALLERY_ROW_1_LEFT.Z,
          RING_STAGES.GALLERY_ROW_1_RIGHT.Z,
          smoothP,
        );
      } else if (p <= SCROLL_MARKERS.GALLERY_ROW_2_END) {
        let localP = mapRange(
          p,
          SCROLL_MARKERS.GALLERY_R2_START_SWEEP,
          SCROLL_MARKERS.GALLERY_ROW_2_END,
          0,
          1,
        );
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

        targetX = THREE.MathUtils.lerp(
          RING_STAGES.GALLERY_ROW_1_RIGHT.X,
          RING_STAGES.GALLERY_ROW_2_LEFT.X,
          smoothP,
        );
        targetZ = RING_STAGES.GALLERY_ROW_2_LEFT.Z;
      } else {
        let localP = mapRange(
          p,
          SCROLL_MARKERS.GALLERY_R3_START_SWEEP,
          SCROLL_MARKERS.GALLERY_ROW_3_END,
          0,
          1,
        );
        localP = THREE.MathUtils.clamp(localP, 0, 1);
        const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

        targetX = THREE.MathUtils.lerp(
          RING_STAGES.GALLERY_ROW_3_LEFT.X,
          RING_STAGES.GALLERY_ROW_3_CENTER.X,
          smoothP,
        );
        targetZ = THREE.MathUtils.lerp(
          RING_STAGES.GALLERY_ROW_3_LEFT.Z,
          RING_STAGES.GALLERY_ROW_3_CENTER.Z,
          smoothP,
        );
      }
    } else {
      let localP = mapRange(p, SCROLL_MARKERS.GALLERY_ROW_3_END, 1.0, 0, 1);
      localP = THREE.MathUtils.clamp(localP, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

      const startRotY = Math.PI / 4 + Math.PI * 4;

      targetX = THREE.MathUtils.lerp(
        RING_STAGES.GALLERY_ROW_3_CENTER.X,
        RING_STAGES.PACT.X,
        smoothP,
      );
      targetY = THREE.MathUtils.lerp(
        RING_STAGES.GALLERY_BASE.Y,
        RING_STAGES.PACT.Y,
        smoothP,
      );
      targetZ = THREE.MathUtils.lerp(
        RING_STAGES.GALLERY_ROW_3_CENTER.Z,
        RING_STAGES.PACT.Z,
        smoothP,
      );
      targetScale = THREE.MathUtils.lerp(
        RING_STAGES.GALLERY_BASE.SCALE,
        RING_STAGES.PACT.SCALE,
        smoothP,
      );

      targetRotX = THREE.MathUtils.lerp(0, RING_STAGES.PACT.ROT_X, smoothP);
      targetRotZ = THREE.MathUtils.lerp(
        RING_STAGES.GALLERY_BASE.ROT_Z,
        RING_STAGES.PACT.ROT_Z,
        smoothP,
      );
      targetRotY = THREE.MathUtils.lerp(
        startRotY,
        startRotY + Math.PI,
        smoothP,
      );
    }

    gothicCompRef.current.position.x = THREE.MathUtils.lerp(
      gothicCompRef.current.position.x,
      targetX,
      0.05,
    );
    gothicCompRef.current.position.y = THREE.MathUtils.lerp(
      gothicCompRef.current.position.y,
      targetY,
      0.05,
    );
    gothicCompRef.current.position.z = THREE.MathUtils.lerp(
      gothicCompRef.current.position.z,
      targetZ,
      0.05,
    );
    gothicCompRef.current.scale.setScalar(
      THREE.MathUtils.lerp(gothicCompRef.current.scale.x, targetScale, 0.05),
    );
    gothicCompRef.current.rotation.x = targetRotX;
    gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.y,
      targetRotY,
      0.05,
    );
    gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.z,
      targetRotZ,
      0.05,
    );
  });
}
