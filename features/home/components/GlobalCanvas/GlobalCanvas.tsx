"use client";

import { Suspense } from "react";
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
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: false }}
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
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />
    </div>
  );
}
