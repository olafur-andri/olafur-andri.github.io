import {RaddleHintLevel, RaddleSolveDirection, RaddleState, RaddleStateStep} from './raddle-game-page';

export interface RaddleStateSaveData {
  id: string;
  steps: readonly RaddleStepSaveData[];
  solveDirection: RaddleSolveDirection;
  rngSeed: number;
  author: string;
}

export interface RaddleStepSaveData {
  word: string;
  clueToNextWord: string | null;
  phraseToNextWord: string | null;
  userInput: string;
  id: string;
  hintLevel: RaddleHintLevel;
}

export function convertToRaddleStateSaveData(raddleState: RaddleState): RaddleStateSaveData {
  return {
    id: raddleState.id,
    solveDirection: raddleState.solveDirection,
    rngSeed: raddleState.rngSeed,
    author: raddleState.author,

    steps: raddleState.steps.map(step => ({
      id: step.id,
      word: step.word,
      clueToNextWord: step.clueToNextWord,
      phraseToNextWord: step.phraseToNextWord,
      userInput: step.userInput,
      hintLevel: step.hintLevel,
    })),
  };
}

export function convertFromRaddleStateSaveData(saveData: RaddleStateSaveData): RaddleState {
  return new RaddleState(
    saveData.id,

    saveData.steps.map(step => new RaddleStateStep(
      step.word,
      step.clueToNextWord,
      step.phraseToNextWord,
      step.userInput,
      step.id,
      step.hintLevel,
      null,
      null
    )),

    saveData.solveDirection,
    saveData.rngSeed,
    saveData.author,
  );
}
