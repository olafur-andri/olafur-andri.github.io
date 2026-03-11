import {Component, computed, effect, inject, OnInit, signal, untracked} from '@angular/core';
import {applyEach, form, FormField, required} from '@angular/forms/signals';
import {RaddleFooter} from '../raddle-footer/raddle-footer';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDivider} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RaddleSpec, RaddleSpecStep} from '../raddle-game-page/raddle-game-page';
import {MatDialog} from '@angular/material/dialog';
import {GeneratedLinkDialog} from './generated-link-dialog/generated-link-dialog';
import * as lzString from 'lz-string';
import {ConfirmResetFormDialog} from './confirm-reset-form-dialog/confirm-reset-form-dialog';
import {ConfirmResumeFormDialog} from './confirm-resume-form-dialog/confirm-resume-form-dialog';
import {RaddleMakerStepActions} from './raddle-maker-step-actions/raddle-maker-step-actions';
import {EditClueDialog} from './edit-clue-dialog/edit-clue-dialog';
import {EditPhraseDialog} from './edit-phrase-dialog/edit-phrase-dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {
  ConfirmDeleteStepDialog,
  ConfirmDeleteStepDialogData
} from './confirm-delete-step-dialog/confirm-delete-step-dialog';

@Component({
  selector: 'app-raddle-maker-page',
  imports: [RaddleFooter, MatFormFieldModule, FormField, MatInputModule, MatExpansionModule, MatDivider, MatButton, MatIcon, RaddleMakerStepActions, MatCard, MatCardContent],
  templateUrl: './raddle-maker-page.html',
  styleUrl: './raddle-maker-page.scss',
})
export class RaddleMakerPage implements OnInit {
  protected readonly _raddleFormModel = signal<RaddleFormData>(createDefaultFormData());
  private readonly _savingToLocalStorageIsAllowed = signal(false);

  private readonly _nextStepId = computed(() =>
    this._raddleFormModel()
      .steps
      .map(step => step.id)
      .reduce((maxSoFar, currentId) => Math.max(maxSoFar, currentId), -Infinity)
    + 1);

  private readonly _dialog = inject(MatDialog);

  protected readonly _raddleForm = form(this._raddleFormModel, (schemaPath) => {
    required(schemaPath.lastWord, {message: 'This field is required'});

    applyEach(schemaPath.steps, (step) => {
      required(step.word, {message: 'This field is required'});
      required(step.clueToNextWord, {message: 'The clue to the next word is required'});
      required(step.phraseToNextWord, {message: 'The phrase to the next word is required'});
    });
  });

  constructor() {
    // effect that saves the current form data to localStorage
    effect(() => {
      if (!this._savingToLocalStorageIsAllowed()) {
        return;
      }

      const formData = this._raddleFormModel();
      const formDataJson = JSON.stringify(formData);
      localStorage.setItem(LOCAL_STORAGE_KEY, formDataJson);
    });
  }

  public ngOnInit() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const defaultFormJson = JSON.stringify(createDefaultFormData());

    if (savedData !== null && savedData !== defaultFormJson) {
      const dialogRef = this._dialog.open(ConfirmResumeFormDialog, {
        disableClose: true,
        autoFocus: '#confirm_button',
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this._raddleFormModel.set(JSON.parse(savedData));
        }

        this._savingToLocalStorageIsAllowed.set(true);
      });
    } else {
      this._savingToLocalStorageIsAllowed.set(true);
    }
  }

  protected addStep() {
    this._raddleFormModel.update(formModel => ({
      ...formModel,
      steps: [
        ...formModel.steps,
        {
          id: untracked(this._nextStepId),
          word: '',
          clueToNextWord: '',
          phraseToNextWord: '',
        }
      ]
    }));
  }

  protected removeStep(stepId: number) {
    this._raddleFormModel.update(formModel => ({
      ...formModel,
      steps: formModel.steps.filter(step => step.id !== stepId)
    }));
  }

  protected generateAndShowRaddleLink() {
    const raddleSpec: RaddleSpec = createRaddleSpecFromForm(untracked(this._raddleFormModel));
    const raddleSpecJson = JSON.stringify(raddleSpec);
    const raddleSpecCompressed = lzString.compressToEncodedURIComponent(raddleSpecJson);

    this._dialog.open(GeneratedLinkDialog, {
      data: raddleSpecCompressed,
      autoFocus: '#confirm_button',
    });
  }

  protected askThenResetForm() {
    const dialogRef = this._dialog.open(ConfirmResetFormDialog);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._raddleFormModel.set(createDefaultFormData());
      }
    });
  }

  protected showEditClueDialog(initialClue: string, fromWord: string, toWord: string, clueStepId: number) {
    const dialogRef = this._dialog.open(EditClueDialog, {
      data: { initialClue, fromWord, toWord },
      autoFocus: 'textarea',
      width: EDIT_DIALOG_WIDTH,
      maxWidth: EDIT_DIALOG_MAX_WIDTH,
    });

    dialogRef.afterClosed().subscribe((newClue: string | null | undefined) => {
      if (newClue === null || newClue === undefined) {
        return;
      }

      this._raddleFormModel.update(form => ({
        ...form,
        steps: form.steps.map(step => ({
          ...step,
          clueToNextWord: step.id === clueStepId
            ? newClue
            : step.clueToNextWord
        })),
      }));
    });
  }

  protected showEditPhraseDialog(initialPhrase: string, fromWord: string, toWord: string, phraseStepId: number) {
    const dialogRef = this._dialog.open(EditPhraseDialog, {
      data: { initialPhrase, fromWord, toWord },
      autoFocus: 'input',
      width: EDIT_DIALOG_WIDTH,
      maxWidth: EDIT_DIALOG_MAX_WIDTH,
    });

    dialogRef.afterClosed().subscribe((newPhrase: string | null | undefined) => {
      if (newPhrase === null || newPhrase === undefined) {
        return;
      }

      this._raddleFormModel.update(form => ({
        ...form,
        steps: form.steps.map(step => ({
          ...step,
          phraseToNextWord: step.id === phraseStepId
            ? newPhrase
            : step.phraseToNextWord
        })),
      }));
    });
  }

  protected showDeleteStepDialog(stepId: number, stepWord: string) {
    const currentNrOfSteps = untracked(this._raddleFormModel).steps.length;

    if (currentNrOfSteps <= 1) {
      throw new Error('Cannot delete the last step');
    }

    const dialogRef = this._dialog.open(ConfirmDeleteStepDialog, {
      data: <ConfirmDeleteStepDialogData>{ stepWord },
      autoFocus: 'first-tabbable',
      width: EDIT_DIALOG_WIDTH,
      maxWidth: EDIT_DIALOG_MAX_WIDTH,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean | null | undefined) => {
      if (!confirmed) {
        return;
      }

      this._raddleFormModel.update(form => ({
        ...form,
        steps: form.steps.filter(step => step.id !== stepId),
      }));
    })
  }

  protected swapStepWithNext(stepId: number) {
    const steps = untracked(this._raddleFormModel).steps;
    const stepIndex = steps.findIndex(step => step.id === stepId);

    if (stepIndex < 0) {
      throw new Error('Cannot swap step with the next one because the requested step was not found');
    }

    const nextStepIndex = stepIndex + 1;

    if (nextStepIndex >= steps.length) {
      throw new Error('Cannot swap step with the next one because the next step is the last word');
    }

    // perform the swap
    const newSteps = [...steps];
    [newSteps[stepIndex], newSteps[nextStepIndex]] = [newSteps[nextStepIndex], newSteps[stepIndex]];

    untracked(() => {
      this._raddleFormModel.update(form => ({
        ...form,
        steps: newSteps,
      }));
    });
  }

  protected prependStep() {
    untracked(() => {
      this._raddleFormModel.update(form => ({
        ...form,
        steps: [
          {
            id: untracked(this._nextStepId),
            word: '',
            phraseToNextWord: '',
            clueToNextWord: '',
          },
          ...form.steps,
        ],
      }));
    });
  }

  protected insertStepBelow(stepId: number) {
    const steps = untracked(this._raddleFormModel).steps;
    const stepIndex = steps.findIndex(step => step.id === stepId);

    if (stepIndex < 0) {
      throw new Error('Cannot insert step below the requested step because the requested step was not found');
    }

    const newSteps = [...steps];
    newSteps.splice(stepIndex + 1, 0, {
      id: untracked(this._nextStepId),
      word: '',
      clueToNextWord: '',
      phraseToNextWord: '',
    });

    untracked(() => {
      this._raddleFormModel.update(form => ({
        ...form,
        steps: newSteps,
      }));
    });
  }

  protected appendStep() {
    untracked(() => {
      this._raddleFormModel.update(form => ({
        ...form,
        steps: [...form.steps, {
          id: untracked(this._nextStepId),
          word: form.lastWord,
          clueToNextWord: '',
          phraseToNextWord: '',
        }],
        lastWord: '',
      }));
    });
  }
}

function createRaddleSpecFromForm(formData: RaddleFormData): RaddleSpec {
  if (formData.steps.length === 0) {
    throw new Error('Cannot create raddle spec when form has no steps');
  }

  return {
    id: self.crypto.randomUUID(),
    rngSeed: formData.rngSeed,
    author: formData.author,
    firstStep: createRaddleSpecStepFromForm(formData.steps[0]),

    intermediateSteps: formData.steps
      .slice(1)
      .map(createRaddleSpecStepFromForm),

    lastWord: formData.lastWord,
  };
}

function createRaddleSpecStepFromForm(stepData: RaddleStepData): RaddleSpecStep {
  return {
    word: stepData.word,
    clueToNextWord: stepData.clueToNextWord,
    phraseToNextWord: stepData.phraseToNextWord
  };
}

function createDefaultFormData(): RaddleFormData {
  return {
    author: '',
    rngSeed: 42,
    lastWord: '',
    steps: [
      {id: 0, word: '', clueToNextWord: '', phraseToNextWord: ''},
    ],
  }
}

/** Interface for an object that stores the form state for when the user is making a custom raddle */
interface RaddleFormData {
  author: string,
  rngSeed: number,
  steps: RaddleStepData[],
  lastWord: string,
}

/** Interface for an object that stores the form state for when the user is specifying a single raddle step */
interface RaddleStepData {
  id: number,
  word: string,
  clueToNextWord: string,
  phraseToNextWord: string,
}

const LOCAL_STORAGE_KEY = 'raddle-maker-form-data';
const EDIT_DIALOG_WIDTH = '95%';
const EDIT_DIALOG_MAX_WIDTH = '500px';
