"use client";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Group } from "three";

type GothicComponentProps = {
  scale?: number[];
  rotation?: [number, number, number] | number[];
  visible?: boolean;
};
export const GothicComponent = forwardRef<Group, GothicComponentProps>(
  ({ scale = 1, visible, ...props }, ref) => {
    const { scene } = useGLTF("/models/gothic_ring.glb");
    return (
      <primitive
        object={scene}
        scale={scale}
        visible={visible}
        ref={ref}
        {...props}
      />
    );
  },
);
GothicComponent.displayName = "GothicComponent";
