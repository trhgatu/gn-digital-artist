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
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useFrame((state) => {
    if (!gothicCompRef.current) return;

    const p = scrollProgressRef.current;

    let targetX = RING_STAGES.HERO.X;
    let targetY =
      RING_STAGES.HERO.Y + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    let targetZ = RING_STAGES.HERO.Z;
    let targetScale = RING_STAGES.HERO.SCALE;

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
        SCROLL_MARKERS.HERO_END + 0.1,
        0,
        1,
      );
      localP = THREE.MathUtils.clamp(localP, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

      targetX = THREE.MathUtils.lerp(RING_STAGES.ABOUT.X, 0, smoothP);
      targetY = THREE.MathUtils.lerp(RING_STAGES.ABOUT.Y, 4, smoothP);
      targetZ = THREE.MathUtils.lerp(RING_STAGES.ABOUT.Z, -2, smoothP);
      targetScale = THREE.MathUtils.lerp(RING_STAGES.ABOUT.SCALE, 0, smoothP);
    } else if (p <= SCROLL_MARKERS.GALLERY_ROW_3_END) {
      targetScale = 0;
      targetX = 0;
      targetY = 4;
      targetZ = -2;
    } else {
      let localP = mapRange(
        p,
        SCROLL_MARKERS.GALLERY_ROW_3_END - 0.05,
        1.0,
        0,
        1,
      );
      localP = THREE.MathUtils.clamp(localP, 0, 1);
      const smoothP = THREE.MathUtils.smoothstep(localP, 0, 1);

      const startRotY = Math.PI / 4 + Math.PI * 4;

      targetX = THREE.MathUtils.lerp(0, RING_STAGES.PACT.X, smoothP);
      targetY = THREE.MathUtils.lerp(4, RING_STAGES.PACT.Y, smoothP);
      targetZ = THREE.MathUtils.lerp(-2, RING_STAGES.PACT.Z, smoothP);
      targetScale = THREE.MathUtils.lerp(0, RING_STAGES.PACT.SCALE, smoothP);

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
      0.08,
    );
    gothicCompRef.current.position.y = THREE.MathUtils.lerp(
      gothicCompRef.current.position.y,
      targetY,
      0.08,
    );
    gothicCompRef.current.position.z = THREE.MathUtils.lerp(
      gothicCompRef.current.position.z,
      targetZ,
      0.08,
    );
    gothicCompRef.current.scale.setScalar(
      THREE.MathUtils.lerp(gothicCompRef.current.scale.x, targetScale, 0.05),
    );
    gothicCompRef.current.rotation.x = targetRotX;
    gothicCompRef.current.rotation.y = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.y,
      targetRotY,
      0.08,
    );
    gothicCompRef.current.rotation.z = THREE.MathUtils.lerp(
      gothicCompRef.current.rotation.z,
      targetRotZ,
      0.08,
    );
  });
}
