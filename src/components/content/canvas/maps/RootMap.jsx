import { useRecoilValue } from "recoil";
import { GroundElements } from "./structures/ground";
import { CharacterSelectFinishedAtom } from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";

export const RootMap = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);

  return (
    <>{!characterSelectFinished ? <CharacterInit /> : <GroundElements />}</>
  );
};
