import {afterRenderEffect, Component, computed, inject, input, model, untracked} from '@angular/core';
import {
  RaddleHintLevel,
  RaddleSolveDirection,
  RaddleState,
  RaddleStateStep
} from '../raddle-game-page/raddle-game-page';
import {MatButton} from '@angular/material/button';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmHintDialogData, ConfirmHintDialog as RaddleConfirmHintDialog } from '../raddle-game-page/confirm-hint-dialog/confirm-hint-dialog';

@Component({
  selector: 'app-raddle-ladder',
  imports: [
    MatButton,
    MatIcon
],
  templateUrl: './raddle-ladder.html',
  styleUrl: './raddle-ladder.scss',
})
export class RaddleLadder {
  public readonly raddleState = model.required<RaddleState>();
  public readonly activeStep = input.required<RaddleStateStep | null>();
  public readonly raddleIsCompleted = input.required<boolean>();

  protected readonly _steps = computed(() => this.raddleState().steps);

  protected readonly _clueToStep = computed<RaddleStateStep | null>(() => {
    const solveDirection = this._solveDirection();
    const activeStep = this.activeStep();

    if (activeStep === null) {
      return null;
    }

    if (solveDirection === 'downward') {
      return activeStep;
    }

    if (solveDirection === 'upward') {
      return activeStep.nextStep;
    }

    throw new Error('Don\'t know how to get the "to step" when solveDirection=' + solveDirection);
  });

  protected readonly _clueFromStep = computed<RaddleStateStep | null>(() => {
    const solveDirection = this._solveDirection();
    const activeStep = this.activeStep();

    if (activeStep === null) {
      return null;
    }

    if (solveDirection === 'downward') {
      return activeStep.previousStep;
    }

    if (solveDirection === 'upward') {
      return activeStep;
    }

    throw new Error('Don\'t know how to get the "to step" when solveDirection=' + solveDirection);
  });

  protected readonly _switchSolveDirectionLabel = computed(() => {
    const solveDirection = this._solveDirection();

    switch (solveDirection) {
      case 'upward':
        return 'Switch to solving ↓ downwards';
      case 'downward':
        return 'Switch to solving ↑ upwards';
      default:
        throw new Error('Don\'t know how to get the text for the "switch solve direction" button when solveDirection=' + solveDirection);
    }
  });

  protected readonly _enabledInputIds = computed(() => {
    const steps = this._steps();

    return new Set<string>(
      steps
        .filter(step => step.previousStep && step.nextStep
          ? step.previousStep.isCompleted || step.nextStep.isCompleted
          : false
        )
        .map(step => step.id)
    );
  });

  private readonly _solveDirection = computed(() => this.raddleState().solveDirection);
  private readonly _activeStepId = computed<string | null>(() => this.activeStep()?.id ?? null);

  private readonly _dialogService = inject(MatDialog);

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('light_bulb', sanitizer.bypassSecurityTrustHtml(LIGHT_BULB_ICON));
    iconRegistry.addSvgIconLiteral('eye', sanitizer.bypassSecurityTrustHtml(EYE_ICON));

    // an effect that focuses the input which is active
    afterRenderEffect(() => {
      const activeStepId = this._activeStepId();
      this._solveDirection(); // force this effect to also run when the solve-direction changes

      if (activeStepId === null) {
        return;
      }

      document.getElementById(`input_${activeStepId}`)?.focus();
    });
  }

  protected updateStepValue(step: RaddleStateStep, event: Event) {
    if (event.target === null) {
      return;
    }

    const inputElement = event.target as HTMLInputElement;
    const newUserInput = inputElement.value;

    this.raddleState.update(state =>
      state.withUpdatedStep(step.id, { userInput: newUserInput }));
  }

  protected toggleSolveDirection() {
    const solveDirection = untracked(this._solveDirection);

    let newSolveDirection: RaddleSolveDirection;

    if (solveDirection === 'downward') {
      newSolveDirection = 'upward';
    } else if (solveDirection === 'upward') {
      newSolveDirection = 'downward';
    } else {
      throw new Error('Don\'t know how to toggle solve direction from ' + solveDirection);
    }

    this.raddleState.update(state => state.with({ solveDirection: newSolveDirection }));
  }

  protected onInputFocused(step: RaddleStateStep) {
    const activeStep = untracked(this.activeStep);

    if (step.id === activeStep?.id) {
      return;
    }

    // since all other inputs are disabled, then we can assume that the user is trying to focus on the input on the
    // other side of the ladder, so we switch the solve-direction to make that input active
    this.toggleSolveDirection();
  }

  protected onHintButtonClicked(step: RaddleStateStep) {
    const newHintLevel = upgradeHintLevel(step.hintLevel);

    const confirmDialogRef = this._dialogService.open(RaddleConfirmHintDialog, {
      data: getConfirmDialogData(newHintLevel),
    });

    confirmDialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const newUserInput = newHintLevel === 'reveal-word'
          ? step.word
          : step.userInput;

        this.raddleState.update(state => state.withUpdatedStep(
          step.id,
          {
            hintLevel: newHintLevel,
            userInput: newUserInput,
          }
        ));
      }
    });
  }
}

function getConfirmDialogData(hintLevel: RaddleHintLevel): ConfirmHintDialogData {
  switch (hintLevel) {
    case 'reveal-clue':
      return {
        title: 'Reveal clue?',
        content: 'This will reveal which <b>clue</b> is needed for this step of the ladder.',
      };
    case 'reveal-word':
      return {
        title: 'Show answer?',
        content: 'This will show the <b>answer</b> for this step of the ladder.',
      };
    default:
      throw new Error('Don\'t know how to get confirm dialog data for hint level \'' + hintLevel + '\'');
  }
}

function upgradeHintLevel(hintLevel: RaddleHintLevel): RaddleHintLevel {
  switch (hintLevel) {
    case 'no-hint':
      return 'reveal-clue';
    case 'reveal-clue':
      return 'reveal-word';
    default:
      throw new Error('Don\'t know how to upgrade hint level \'' + hintLevel + '\'');
  }
}

const LIGHT_BULB_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
  `;

const EYE_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  `;
