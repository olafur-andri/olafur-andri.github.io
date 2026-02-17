import {Component, computed, input} from '@angular/core';
import {RaddleSolveDirection, RaddleState, RaddleStateStep} from '../raddle-game-page';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-raddle-clues-lists',
  imports: [
    MatDivider
  ],
  templateUrl: './raddle-clues-lists.html',
  styleUrl: './raddle-clues-lists.scss',
})
export class RaddleCluesLists {
  public readonly raddleState = input.required<RaddleState>();
  public readonly activeStep = input.required<RaddleStateStep | null>();
  public readonly raddleIsCompleted = input.required<boolean>();

  protected readonly _unusedCluesShuffled = computed(() => {
    const shuffledSteps = this._shuffledSteps();
    const solveDirection = this._solveDirection();
    const activeStep = this.activeStep();
    const result: Clue[] = [];

    for (const shuffledStep of shuffledSteps) {
      if (!stringIsNullOrWhitespace(shuffledStep.clueToNextWord) && !clueForStepIsUsed(shuffledStep)) {
        const clue = getUnusedClueForStep(shuffledStep, solveDirection, activeStep);

        if (clue !== null) {
          result.push(clue);
        }
      }
    }

    return result;
  });

  protected readonly _usedClues = computed(() => {
    const steps = this._steps();
    const result: Clue[] = [];

    for (const step of steps) {
      if (clueForStepIsUsed(step)) {
        const clue = getUsedClueForStep(step);

        if (clue !== null) {
          result.push(clue);
        }
      }
    }

    return result;
  });

  protected readonly _cluesInOrder = computed(() => {
    const steps = this._steps();
    const result: Clue[] = [];

    for (const step of steps) {
      const clue = getUsedClueForStep(step);

      if (clue !== null) {
        result.push(clue);
      }
    }

    return result;
  });

  protected readonly _highlightedClueId = computed<string | null>(() => {
    const activeStep = this.activeStep();
    const solveDirection = this._solveDirection();

    if (activeStep === null) {
      return null;
    }

    if (activeStep.hintLevel !== 'reveal-clue') {
      return null;
    }

    switch (solveDirection) {
      case 'downward':
        return activeStep.previousStep?.id ?? null;
      case 'upward':
        return activeStep.id;
      default:
        throw new Error('Don\'t know how to get the highlighted clue id when solveDirection=' + solveDirection);
    }
  });

  private readonly _rngSeed = computed(() => this.raddleState().rngSeed);
  private readonly _steps = computed(() => this.raddleState().steps);
  private readonly _solveDirection = computed(() => this.raddleState().solveDirection);

  private readonly _shuffledSteps = computed(() => {
    const steps = this._steps();
    const shuffledSteps = [...steps];
    const rng = mulberry32(this._rngSeed());
    shuffleArrayInPlace(shuffledSteps, rng);
    return shuffledSteps;
  });
}

function getUnusedClueForStep(
  step: RaddleStateStep,
  solveDirection: RaddleSolveDirection,
  activeStep: RaddleStateStep | null
): Clue | null {
  if (step.clueToNextWord === null || activeStep === null || activeStep.nextStep === null) {
    return null;
  }

  let remainingClue = step.clueToNextWord;
  const clueSegments: ClueSegment[] = [];

  while (remainingClue.length > 0) {
    const result = getNextUnusedClueSegment(remainingClue, solveDirection, activeStep);
    clueSegments.push(result.clueSegment);
    remainingClue = result.remainingClue;
  }

  // if the user is solving upwards, then we want to make sure that the {to} word is included in the clue
  const toIsMissing = !clueSegments.some(segment => segment.type === 'to');
  if (solveDirection === 'upward' && toIsMissing) {
    clueSegments.push({
      type: 'normal',
      text: ' → '
    });

    clueSegments.push({
      type: 'to',
      text: activeStep.nextStep.word,
    });
  }

  return {
    id: step.id,
    segments: clueSegments,
  };
}

function getUsedClueForStep(step: RaddleStateStep) : Clue | null {
  if (step.clueToNextWord === null || step.nextStep === null) {
    return null;
  }

  let remainingClue = step.clueToNextWord;
  const clueSegments: ClueSegment[] = [];

  while (remainingClue.length > 0) {
    const result = getNextUsedClueSegment(remainingClue, step.word, step.nextStep.word);
    clueSegments.push(result.clueSegment);
    remainingClue = result.remainingClue;
  }

  // if {to} is not already included in the clue, then I must append it at the end in the structure
  // "{original clue} --> {to}"
  const toIsMissing = !clueSegments.some(segment => segment.type === 'to');

  if (toIsMissing) {
    clueSegments.push({
      type: 'normal',
      text: ' → '
    });

    clueSegments.push({
      type: 'to',
      text: step.nextStep.word,
    });
  }

  return {
    id: step.id,
    segments: clueSegments
  }
}

/** Finds and returns the first segment at the start of the given clue string, along with what remains of the clue after
 * it's been removed */
function getNextUnusedClueSegment(
  clue: string,
  solveDirection: RaddleSolveDirection,
  activeStep: RaddleStateStep
) {
  if (clue === '') {
    throw new Error('Can\'t get next unused clue segment from empty clue');
  }

  let clueSegment: ClueSegment;
  let remainingClue: string;

  if (clue.startsWith('{from}')) {
    if (solveDirection === 'downward') {
      clueSegment = {
        type: 'from',
        text: activeStep.previousStep?.word ?? '???',
      };
    } else if (solveDirection === 'upward') {
      clueSegment = {
        type: 'blank',
        text: '',
      };
    } else {
      throw new Error('Don\'t know how to convert clue string for solveDirection=' + solveDirection);
    }

    remainingClue = clue.substring('{from}'.length);
  } else if (clue.startsWith('{to}')) {
    if (solveDirection === 'downward') {
      clueSegment = {
        type: 'blank',
        text: '',
      };
    } else if (solveDirection === 'upward') {
      clueSegment = {
        type: 'to',
        text: activeStep.nextStep?.word ?? '???',
      };
    } else {
      throw new Error('Don\'t know how to convert clue string for solveDirection=' + solveDirection);
    }

    remainingClue = clue.substring('{to}'.length);
  } else {
    const length = getLengthOfNextNormalClueSegment(clue);
    clueSegment = {
      type: 'normal',
      text: clue.substring(0, length),
    };
    remainingClue = clue.substring(length);
  }

  return { clueSegment, remainingClue };
}

/** Finds and returns the first segment at the start of the given clue string, along with what remains of the clue after
 * it's been removed */
function getNextUsedClueSegment(clue: string, fromWord: string, toWord: string) {
  if (clue === '') {
    throw new Error('Can\'t get next used clue segment from empty clue');
  }

  let clueSegment: ClueSegment;
  let remainingClue: string;

  if (clue.startsWith('{from}')) {
    clueSegment = {
      type: 'from',
      text: fromWord,
    };
    remainingClue = clue.substring('{from}'.length);
  } else if (clue.startsWith('{to}')) {
    clueSegment = {
      type: 'to',
      text: toWord,
    };
    remainingClue = clue.substring('{to}'.length);
  } else {
    const length = getLengthOfNextNormalClueSegment(clue);
    clueSegment = {
      type: 'normal',
      text: clue.substring(0, length),
    };
    remainingClue = clue.substring(length);
  }

  return { clueSegment, remainingClue };
}

function getLengthOfNextNormalClueSegment(clue: string) {
  let fromIndex = clue.indexOf('{from}');
  let toIndex = clue.indexOf('{to}');

  if (fromIndex === -1) {
    fromIndex = clue.length;
  }

  if (toIndex === -1) {
    toIndex = clue.length;
  }

  return Math.min(fromIndex, toIndex);
}

function clueForStepIsUsed(step: RaddleStateStep) {
  if (step.nextStep === null) {
    return true;
  }

  return step.isCompleted && step.nextStep.isCompleted;
}

function shuffleArrayInPlace<T>(array: T[], rng: () => number) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick the remaining element...
    let randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

/** Returns a seeded RNG */
function mulberry32(seed: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function stringIsNullOrWhitespace(s: string | null | undefined) {
  return !s || !s.trim();
}

interface ClueSegment {
  type: 'normal' | 'from' | 'to' | 'blank',
  text: string
}

interface Clue {
  segments: readonly ClueSegment[],
  id: string,
}
