"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float dist = distance(vUv * aspect, uMouse * aspect);
    float mask = smoothstep(0.15, 0.4, dist);

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
    gl_Position = vec4(position.x, position.y, 0.999, 1.0);
}
`;

export const InteractiveGothicBackground = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const texture = useTexture("/assets/images/gothic_background.jpg");

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [texture, size],
  );

  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (shaderRef.current) {
      const targetX = (state.pointer.x + 1.0) / 2.0;
      const targetY = (state.pointer.y + 1.0) / 2.0;

      currentMouse.current.lerpVectors(
        currentMouse.current,
        new THREE.Vector2(targetX, targetY),
        0.05,
      );

      shaderRef.current.uniforms.uMouse.value.copy(currentMouse.current);
      shaderRef.current.uniforms.uResolution.value.set(size.width, size.height);
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
