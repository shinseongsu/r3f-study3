import { useRecoilValue } from "recoil";
import { CharacterSelectFinishedAtom, MeAtom } from "../../store/PlayersAtom";
import { MainCanvas } from "../MainCanvas";
import { CanvasLayout } from "./canvasLayout/Layout";
import { Lobby } from "./lobby/Lobby";

export const Content = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const me = useRecoilValue(MeAtom);

  if (characterSelectFinished && me) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }

  return <Lobby />;
};
