import {Component, computed, effect, inject, linkedSignal, signal, untracked} from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { RaddleCluesLists } from './raddle-clues-lists/raddle-clues-lists';
import { RaddleLadder } from '../raddle-ladder/raddle-ladder';
import {MatAnchor, MatButton} from "@angular/material/button";
import * as lzString from 'lz-string';
import { ActivatedRoute } from '@angular/router';
import { RaddleFooter } from "../raddle-footer/raddle-footer";
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {convertFromRaddleStateSaveData, convertToRaddleStateSaveData, RaddleStateSaveData} from './raddle-state-saved';

@Component({
  selector: 'app-raddle-game-page',
  imports: [
    MatChip,
    RaddleCluesLists,
    RaddleLadder,
    MatAnchor,
    RaddleFooter,
    MatButton,
    MatIcon
  ],
  templateUrl: './raddle-game-page.html',
  styleUrl: './raddle-game-page.scss',
})
export class RaddleGamePage {
  private readonly _raddleSpec = computed<RaddleSpec>(() => {
    const compressedSpecJson = this._compressedSpecJson();

    if (compressedSpecJson === null) {
      return createEmptyRaddleSpec();
    }

    const specJson = lzString.decompressFromEncodedURIComponent(compressedSpecJson);
    let spec: RaddleSpec;

    try {
      spec = JSON.parse(specJson);
      return spec;
    } catch (e) {
      if (e instanceof SyntaxError) {
        return createErrorRaddleSpec();
      }
      throw e;
    }
  });

  protected readonly _raddleState = linkedSignal({
    source: this._raddleSpec,
    computation: (spec) => getInitialRaddleStateForSpec(spec)
  });

  protected readonly _raddleTitle = computed(() => {
    const spec = this._raddleSpec();
    return `From ${spec.firstStep.word.toUpperCase()} to ${spec.lastWord.toUpperCase()}`;
  });

  protected readonly _raddleAuthor = computed(() => this._raddleSpec().author);

  protected readonly _activeStep = computed<RaddleStateStep | null>(() => {
    const raddleState = this._raddleState();

    if (raddleState.solveDirection === 'downward') {
      return raddleState.steps.find(step => !step.isCompleted) ?? null;
    }

    if (raddleState.solveDirection === 'upward') {
      return raddleState.steps.findLast(step => !step.isCompleted) ?? null;
    }

    throw new Error('Cannot get the active Raddle step when solveDirection=' + raddleState.solveDirection);
  });

  protected readonly _raddleIsCompleted = computed(() => this._raddleState().steps.every(step => step.isCompleted));
  protected readonly _firstWord = computed(() => this._raddleSpec().firstStep.word);
  protected readonly _lastWord = computed(() => this._raddleSpec().lastWord);
  // protected readonly _hintLevels = computed(() => this._raddleState().steps.map(step => step.hintLevel));
  protected readonly _hintEmojis = computed(() => getHintEmojis(this._raddleState()));

  private readonly _saveData = computed(() => convertToRaddleStateSaveData(this._raddleState()))
  private readonly _compressedSpecJson = signal<string | null>(null);
  private readonly _snackBarService = inject(MatSnackBar);

  constructor() {
    // fetch the raddle spec from the URL
    const activatedRoute = inject(ActivatedRoute);
    activatedRoute.paramMap.subscribe(
      paramMap => this._compressedSpecJson.set(paramMap.get('spec'))
    );

    // an effect that saves the current state to localStorage
    effect(() => {
      const saveData = this._saveData();

      if (!saveData.id) {
        return;
      }

      const saveDataJson = JSON.stringify(saveData);
      localStorage.setItem(saveData.id, saveDataJson);
    });
  }

  protected async copyResultsToClipboard() {
    const clipboardString = `${untracked(this._firstWord).toUpperCase()} → ${untracked(this._lastWord).toUpperCase()}
${untracked(this._hintEmojis)}
${location.href}`;

    try {
      await navigator.clipboard.writeText(clipboardString);
      this._snackBarService.open('Results copied to clipboard', undefined, {duration: 2000});
    } catch (e) {
      this._snackBarService.open('Failed to copy results to clipboard', undefined, {duration: 2000});
      throw e;
    }
  }
}

export function initializeStepLinks(steps: readonly RaddleStateStep[]) {
  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];
    currentStep.previousStep = i > 0 ? steps[i - 1] : null;
    currentStep.nextStep = i < steps.length - 1 ? steps[i + 1] : null;
  }
}

function createEmptyRaddleSpec() : RaddleSpec {
  return {
    id: '',
    firstStep: {
      word: '',
      clueToNextWord: '',
      phraseToNextWord: '',
    },
    intermediateSteps: [],
    lastWord: '',
    author: '',
    rngSeed: 42,
  };
}

function createErrorRaddleSpec(): RaddleSpec {
  return {
    id: '',
    firstStep: {
      word: 'error',
      clueToNextWord: '',
      phraseToNextWord: '',
    },
    intermediateSteps: [],
    lastWord: 'encountered',
    author: '',
    rngSeed: 42
  };
}

function getInitialRaddleStateForSpec(spec: RaddleSpec): RaddleState {
  // check if we have saved data from this raddle
  const savedJson = localStorage.getItem(spec.id);

  if (savedJson) {
    const saveData = JSON.parse(savedJson) as RaddleStateSaveData;
    return convertFromRaddleStateSaveData(saveData);
  }

  // otherwise, we return an initial state

  const steps = [
    // first step
    new RaddleStateStep(
      spec.firstStep.word,
      spec.firstStep.clueToNextWord,
      spec.firstStep.phraseToNextWord,
      spec.firstStep.word,
      self.crypto.randomUUID(),
      'no-hint',
      null,
      null
    ),

    // intermediate steps
    ...spec.intermediateSteps.map<RaddleStateStep>(step => new RaddleStateStep(
      step.word,
      step.clueToNextWord,
      step.phraseToNextWord,
      '',
      self.crypto.randomUUID(),
      'no-hint',
      null,
      null
    )),

    // last step
    new RaddleStateStep(
      spec.lastWord,
      null,
      null,
      spec.lastWord,
      self.crypto.randomUUID(),
      'no-hint',
      null,
      null
    ),
  ];

  return new RaddleState(
    spec.id,
    steps,
    'downward',
    spec.rngSeed,
    spec.author
  );
}

function getHintEmojis(raddleState: RaddleState) {
  let result = '';

  for (const step of raddleState.steps) {
    switch (step.hintLevel) {
      case 'no-hint':
        result += '🟢';
        break;
      case 'reveal-clue':
        result += '💡';
        break;
      case 'reveal-word':
        result += '👁️';
        break;
      default:
        throw new Error('Unknown hint level: ' + step.hintLevel);
    }
  }

  return result;
}

export class RaddleState {
  constructor(
    public readonly id: string,
    public readonly steps: readonly RaddleStateStep[],
    public readonly solveDirection: RaddleSolveDirection,

    /** The RNG seed that is used to randomly shuffle the clues */
    public readonly rngSeed: number,
    public readonly author: string,
  ) {
    // make sure next/previous step links are correctly initialized
    initializeStepLinks(steps);
  }

  public withUpdatedStep(stepId: string, updater: RaddleStateStepUpdater): RaddleState {
    const newSteps: RaddleStateStep[] = [...this.steps];
    const stepIndex = newSteps.findIndex(step => step.id === stepId);

    if (stepIndex === -1) {
      throw new Error('Cannot update step with id ' + stepId + ' because it was not found in the RaddleState');
    }

    newSteps[stepIndex] = newSteps[stepIndex].with(updater);

    return new RaddleState(
      this.id,
      newSteps,
      this.solveDirection,
      this.rngSeed,
      this.author
    );
  }

  public with(updater: RaddleStateUpdater): RaddleState {
    return new RaddleState(
      this.id,
      this.steps,
      updater.solveDirection ?? this.solveDirection,
      this.rngSeed,
      this.author,
    );
  }
}

export interface RaddleStateUpdater {
  solveDirection?: RaddleSolveDirection;
}

export class RaddleStateStep {
  public readonly isCompleted: boolean;
  public readonly inputPlaceholder: string;

  /** The shape of this step's word, written out like (3'1) for the word "don't" */
  public readonly wordShape: string;

  constructor(
    public readonly word: string,
    public readonly clueToNextWord: string | null,
    public readonly phraseToNextWord: string | null,
    public readonly userInput: string,
    public readonly id: string,
    public readonly hintLevel: RaddleHintLevel,
    public nextStep: RaddleStateStep | null,
    public previousStep: RaddleStateStep | null
  ) {
    this.isCompleted = this.normalizeStringForComparison(userInput) === this.normalizeStringForComparison(word);
    this.wordShape = this.getShape(word);
    this.inputPlaceholder = this.getPlaceholder(word, this.wordShape);
  }

  public with(updater: RaddleStateStepUpdater): RaddleStateStep {
    return new RaddleStateStep(
      this.word,
      this.clueToNextWord,
      this.phraseToNextWord,
      updater.userInput ?? this.userInput,
      this.id,
      updater.hintLevel ?? this.hintLevel,
      this.nextStep,
      this.previousStep
    );
  }

  private normalizeStringForComparison(s: string) {
    return s
      .normalize('NFD')                    // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '')    // Remove diacritical marks
      .replace(/\s+/g, '')                // Remove all whitespace
      .replace(/[^a-zA-Z0-9]/g, '')       // Remove special characters
      .toLowerCase();
  }

  private getShape(word: string) {
    let result = '';
    let segmentLength = 0;

    for (const char of word) {
      if (SPECIAL_SYMBOLS.has(char)) {
        if (segmentLength > 0) {
          result += segmentLength;
          segmentLength = 0;
        }

        result += char;
      } else if (WHITESPACE_CHARACTERS.has(char)) {
        if (segmentLength > 0) {
          result += segmentLength;
          segmentLength = 0;
        }

        result += char;
      } else {
        segmentLength++;
      }
    }

    if (segmentLength > 0) {
      result += segmentLength;
    }

    return `(${result})`;
  }

  private getPlaceholder(word: string, wordShape: string) {
    let placeholder = '';

    for (const char of word) {
      if (SPECIAL_SYMBOLS.has(char)) {
        placeholder += char;
      } else if (WHITESPACE_CHARACTERS.has(char)) {
        placeholder += char;
      } else {
        placeholder += '▮';
      }
    }

    return `${placeholder} ${wordShape}`;
  }
}

export interface RaddleStateStepUpdater {
  hintLevel?: RaddleHintLevel;
  userInput?: string;
}

export type RaddleHintLevel = 'no-hint' | 'reveal-clue' | 'reveal-word';
export type RaddleSolveDirection = 'downward' | 'upward';

/** A specification for a Raddle (this is what the users create in the Raddle Maker) */
export interface RaddleSpec {
  id: string,
  firstStep: RaddleSpecStep,
  intermediateSteps: readonly RaddleSpecStep[],
  lastWord: string,
  author: string,

  /** The RNG seed that is used to randomly shuffle the clues */
  rngSeed: number,
}

export interface RaddleSpecStep {
  word: string,
  clueToNextWord: string,
  phraseToNextWord: string,
}

const SPECIAL_SYMBOLS: ReadonlySet<string> = new Set('!@#$%^&*()_-+={}[]|\\/:;"\'<>,.?');
const WHITESPACE_CHARACTERS: ReadonlySet<string> = new Set(' \t\n\r\f\v');
