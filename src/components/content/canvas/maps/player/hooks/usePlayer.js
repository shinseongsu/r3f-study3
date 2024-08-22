import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { SkeletonUtils } from "three-stdlib";
import { MeAtom } from "../../../../../../store/PlayersAtom";

export const usePlayer = ({ player, position, modelIndex }) => {
  const playerId = player?.id;
  const memoizedPosition = useMemo(() => position, []);
  const me = useRecoilValue(MeAtom);
  const playerRef = useRef(null);
  const { scene, materials, animations } = useGLTF(
    (() => {
      switch (modelIndex) {
        case 0:
          return `/models/CubeGuyCharacter.glb`;
        case 1:
          return `/models/CubeWomanCharacter.glb`;
        case 2:
          return `/models/Steve.glb`;
        case 3:
          return `/models/Rabbit.glb`;
        default:
          return "";
      }
    })()
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const nodes = objectMap.nodes;

  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );

  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  useFrame(({ camera }) => {
    if (!player) return;
    if (!playerRef.current) return;
    if (playerRef.current.position.distanceTo(position) > 0.1) {
      const direction = playerRef.current.position
        .clone()
        .sub(position)
        .normalize()
        .multiplyScalar(0.04);

      playerRef.current.position.sub(direction);
      playerRef.current.lookAt(position);

      if (actions.walk) {
        setAnimation("walk");
      } else {
        setAnimation(
          "CharacterArmature|CharacterArmature|CharacterArmature|Run"
        );
      }
    } else {
      setAnimation(
        "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
      );
    }

    if (me?.id === playerId) {
      camera.position.set(
        playerRef.current.position.x + 12,
        playerRef.current.position.y + 12,
        playerRef.current.position.z + 12
      );
      camera.lookAt(playerRef.current.position);
    }
  });

  return {
    playerRef,
    memoizedPosition,
    playerId,
    nodes,
    materials,
  };
};
