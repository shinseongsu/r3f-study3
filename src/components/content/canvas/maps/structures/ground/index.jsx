import { Floor } from "./elements/Floor";
import { JungleGym } from "./elements/JungleGym";
import { PineTrees } from "./elements/PineTrees";
import { Swing } from "./elements/Swing";
import { Tree } from "./elements/Tree";
import { Dinosaur } from "./npc/Dinosaur";
import { Zombie } from "./npc/Zombie";

export const GroundElements = () => {
  return (
    <>
      <Floor />

      <JungleGym />
      <Dinosaur />
      <Zombie />

      <Tree position={[-9, 0, -8]} />
      <Tree position={[-10, 0, -10]} />
      <Tree position={[-3, 0, 20]} />
      <Tree position={[-8, 0, 22]} />
      <PineTrees position={[-30, 0, -30]} />
      <PineTrees position={[-20, 0, -30]} />
      <PineTrees position={[-30, 0, -20]} />
      <PineTrees position={[-20, 0, -20]} />
      <Swing />
    </>
  );
};
