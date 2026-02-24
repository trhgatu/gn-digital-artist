"use client";

import { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScroll;
varying vec2 vUv;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float dist = distance(vUv * aspect, uMouse * aspect);
    float mask = smoothstep(0.15, 0.4, dist);

    // Fade mask out as user scrolls down
    // clamp uScroll between 0.0 and 1.0, and maybe accelerate the fade
    float fade = clamp(1.0 - (uScroll * 2.0), 0.0, 1.0);
    mask = mask + (1.0 - fade); // When fade is 0, mask becomes 1.0 (fully covered by bgColor)
    mask = clamp(mask, 0.0, 1.0);

    vec4 bgColor = vec4(0.0196, 0.0196, 0.0196, 1.0);

    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec4 horrorTex = vec4(vec3(gray) * 0.4, 1.0);

    gl_FragColor = mix(horrorTex, bgColor, mask);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    // Map directly to NDC coordinates (fullscreen), but render at z = 0.999 to be behind all models
    gl_Position = vec4(position.x, position.y, 0.999, 1.0);
}
`;

export const InteractiveGothicBackground = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const texture = useTexture("/assets/images/gothic_background.jpg");

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

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScroll: { value: 0.0 },
    }),
    [texture, size],
  );

  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (shaderRef.current) {
      // Smoothly update mouse
      const targetX = (state.pointer.x + 1.0) / 2.0;
      const targetY = (state.pointer.y + 1.0) / 2.0;
      currentMouse.current.lerpVectors(
        currentMouse.current,
        new THREE.Vector2(targetX, targetY),
        0.05,
      );

      shaderRef.current.uniforms.uMouse.value.copy(currentMouse.current);
      shaderRef.current.uniforms.uResolution.value.set(size.width, size.height);
      shaderRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uScroll.value,
        scrollProgress.current,
        0.1,
      );
    }
  });

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
        depthTest={true}
      />
    </mesh>
  );
};
