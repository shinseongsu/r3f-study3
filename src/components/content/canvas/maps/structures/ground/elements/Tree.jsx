import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

const name = "ground-tree";
export const Tree = ({ position }) => {
  const { scene: scene_ } = useGLTF("models/Tree.glb");

  const scene = useMemo(() => {
    return SkeletonUtils.clone(scene_);
  }, []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  return (
    <primitive
      visible
      name={name}
      scale={1}
      position={position}
      rotation-y={Math.PI / 4}
      object={scene}
    />
  );
};
