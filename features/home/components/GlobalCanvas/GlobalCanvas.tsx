"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import { GothicComponentScene } from "../../scenes/GothicComponentScene";
import { InteractiveGothicBackground } from "../InteractiveGothicBackground";

export function GlobalCanvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-0">
      {/* Start invisible; fade in after R3F is ready to prevent abrupt flash on init */}
      <div
        ref={canvasWrapperRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: false }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#050505"), 1);
            // Reveal the canvas after WebGL context is ready, preventing flash
            if (canvasWrapperRef.current) {
              canvasWrapperRef.current.style.opacity = "1";
            }
          }}
          eventSource={
            typeof window !== "undefined" ? document.body : undefined
          }
          eventPrefix="client"
        >
          <Suspense fallback={null}>
            <InteractiveGothicBackground />

            <fog attach="fog" args={["#050505", 3, 15]} />

            <ambientLight intensity={0.05} />
            <spotLight
              position={[3, 8, 4]}
              angle={0.5}
              penumbra={1}
              intensity={2.5}
              castShadow
              color="#ffffff"
            />
            <pointLight
              position={[-2, -5, -2]}
              intensity={50}
              color="#8a0303"
              distance={10}
              decay={2}
            />

            <GothicComponentScene />

            <Environment
              files="/hdr/qwantani_night_puresky_2k.hdr"
              environmentIntensity={0.05}
            />

            <EffectComposer multisampling={4}>
              <Noise
                opacity={0.6}
                premultiply
                blendFunction={BlendFunction.OVERLAY}
              />
              <Vignette eskil={false} offset={0.15} darkness={1.2} />
              <ChromaticAberration offset={new THREE.Vector2(0.0015, 0.0015)} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
