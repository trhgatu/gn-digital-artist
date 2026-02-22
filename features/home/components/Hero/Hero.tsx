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
import { GothicComponentScene } from "../../scenes/GothicComponentScene";
import * as THREE from "three";

import { InteractiveGothicBackground } from "@/features/home/components/InteractiveGothicBackground";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden selection:bg-red-900 selection:text-white">
      <div className="absolute inset-0 z-20 grid grid-cols-1 md:grid-cols-3 items-center pointer-events-none p-8 md:p-16 lg:p-24 gap-8">
        <div className="flex flex-col items-center md:items-start justify-center">
          <h1
            className="flex flex-col items-center md:items-start text-7xl md:text-8xl lg:text-9xl font-cinzel text-white uppercase tracking-widest text-left"
            style={{ mixBlendMode: "difference" }}
          >
            <span className="block opacity-90 drop-shadow-2xl">ART &</span>
            <span
              className="block opacity-90 font-bold italic"
              style={{ filter: "blur(1px)" }}
            >
              SOUL
            </span>
          </h1>
        </div>

        <div className="hidden md:block w-full h-full"></div>

        <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right space-y-12 mt-8 md:mt-0">
          <span className="block text-xl md:text-2xl tracking-[1em] font-sans font-light text-neutral-400">
            GN VISIONS
          </span>
          <p className="text-neutral-600 font-serif tracking-[0.2em] text-sm uppercase max-w-xs leading-relaxed">
            &quot;Draw first for yourself,
            <br />
            for half of your soul.&quot;
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: false }}
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
