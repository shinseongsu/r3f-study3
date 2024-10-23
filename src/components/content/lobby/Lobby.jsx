import { useState } from "react";
import { STEPS } from "../../../data/constants";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CharacterSelectFinishedAtom,
  SelectedCharacterGlbNameIndexAtom,
} from "../../../store/PlayersAtom";
import { isValidText } from "../../../utils";
import styled from "styled-components";
import { MainCanvas } from "../canvas/MainCanvas";
import { socket } from "../../../sockets/clientSocket";

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
  const [tempNickName, setTempNickname] = useState();
  const [tempJobPosition, setTempJobPosition] = useState();
  const [selectedCharacterGlbNameIndex, setSelectedCharacterGlbNameIndex] =
    useRecoilState(SelectedCharacterGlbNameIndexAtom);
  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom
  );

  if (!socket) return null;
  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>Please tell me your name.</LoginTitle>
          <Input
            autoFocus
            placeholder="Please enter your name."
            onChange={(e) => setTempNickname(e.target.value)}
            onKeyUp={(e) => {
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
            Next
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && (
        <>
          <>
            <LoginTitle>A brief introduction about myself.</LoginTitle>
            <Input
              autoFocus
              placeholder=""
              onChange={(e) => setTempJobPosition(e.target.value)}
              onKeyUp={(e) => {
                if (!isValidText(tempJobPosition)) return;
                if (e.key === "Enter") {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
            />
            <NextBtn
              disabled={!isValidText(tempJobPosition)}
              className={isValidText(tempJobPosition) ? "valid" : "disabled"}
              onClick={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Next
            </NextBtn>
            <PrevBtn
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
                setTempNickname();
              }}
            >
              Back
            </PrevBtn>
          </>
        </>
      )}
      {currentStep === STEPS.CHARACTER && (
        <>
          <LoginTitle>Please choose a character.</LoginTitle>
          <CharacterCanvasContainer>
            <CharacterTunningWrapper>
              <CharacterCanvasWrapper>
                <MainCanvas />
              </CharacterCanvasWrapper>
            </CharacterTunningWrapper>

            <NextBtn
              className={
                !tempNickName || !tempJobPosition ? "disabled" : "valid"
              }
              onClick={() => {
                if (!tempNickName || !tempJobPosition) return;

                socket.emit("initialize", {
                  tempNickName,
                  tempJobPosition,
                  selectedCharacterGlbNameIndex,
                  myRoom: { object: [] },
                });
                setCharacterSelectFinished(true);
              }}
              onKeyUp={(e) => {
                if (!tempNickName || !tempJobPosition) return;
                if (e.key === "Enter") {
                  socket.emit("initialize", {
                    tempNickName,
                    tempJobPosition,
                    selectedCharacterGlbNameIndex,
                    myRoom: { object: [] },
                  });
                  setCharacterSelectFinished(true);
                }
              }}
            >
              Go
            </NextBtn>
            <PrevBtn
              onClick={() => {
                setSelectedCharacterGlbNameIndex((prev) => {
                  if (prev === undefined) return 1;
                  if (prev === 2) return 0;
                  return prev + 1;
                });
              }}
            >
              I want to see other characters.
            </PrevBtn>
            <PrevBtn
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Back
            </PrevBtn>
          </CharacterCanvasContainer>
        </>
      )}
      {currentStep === STEPS.FINISH && <></>}
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

const CharacterCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 1200px;
  height: 80%;
`;

const CharacterTunningWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CharacterCanvasWrapper = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

const PrevBtn = styled.button`
  padding: 10px;
  width: 200px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  color: #666666;
  cursor: pointer;
`;
