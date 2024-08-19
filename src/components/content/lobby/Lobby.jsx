import { useState } from "react";
import { STEPS } from "../../../data/constants";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CharacterSelectFinishedAtom,
  SelectedCharacterGlbNameIndexAtom,
} from "../../../store/PlayersAtom";
import { isValidText } from "../../../utils";

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
  const [tempNickName, setTempNickname] = useState();
  const [tempJobPosition, setTempNickname] = useState();
  const [
    selectedCharacterGlbNameIndexAtom,
    setSelectedCharacterGlbNameIndexAtom,
  ] = useRecoilState(SelectedCharacterGlbNameIndexAtom);
  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom
  );

  if (!socket) return null;
  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>패디에서 사용할 내 이름이예요.</LoginTitle>
          <Input
            autoFocus
            placeholder="별명을 입력해주세요."
            onChange={(e) => setTempNickname(e.target.value)}
            onKeyup={(e) => {
              if (!isValidText(tempNickName)) return;
              if (e.key === "Enter") {
                setCurrentStep(STEPS.JOB_POSITION);
              }
            }}
          />
          <NextBtn
            disabled={!isValidText(tempNickName)}
            className={isValidText(tempNickName) ? "valid" : "disabled"}
            onClick={() => {
              setCurrentStep(STEPS.JOB_POSITION);
            }}
          >
            이대로 진행할래요
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && (
        <>
          <>
            <LoginTitle>패디에서 공유할 내 직군이예요.</LoginTitle>
            <Input
              autoFocus
              placeholder="개발 직군을 입력해주세요."
              onChange={(e) => setTempNickname(e.target.value)}
              onKeyup={(e) => {
                if (!isValidText(tempNickName)) return;
                if (e.key === "Enter") {
                  setCurrentStep(STEPS.JOB_POSITION);
                }
              }}
            />
            <NextBtn
              disabled={!isValidText(tempNickName)}
              className={isValidText(tempNickName) ? "valid" : "disabled"}
              onClick={() => {
                setCurrentStep(STEPS.JOB_POSITION);
              }}
            >
              이대로 진행할래요
            </NextBtn>
          </>
        </>
      )}
      ;{currentStep === STEPS.CHARACTER && <></>};
      {currentStep === STEPS.FINISH && <></>};
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background-color: #85e6ff;
`;

const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CharacterCanvasContainer = styled.div``;

const CharacterTunningWrapper = styled.div``;

const CharacterCanvasWrapper = styled.div``;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 200px;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 10px;
  width: 200px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #340070;
      color: #fff;
    }
  }

  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled.button``;
