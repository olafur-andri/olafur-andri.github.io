import {Component, effect, inject, OnInit, signal, untracked} from '@angular/core';
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

@Component({
  selector: 'app-raddle-maker-page',
  imports: [RaddleFooter, MatFormFieldModule, FormField, MatInputModule, MatExpansionModule, MatDivider, MatButton, MatIcon],
  templateUrl: './raddle-maker-page.html',
  styleUrl: './raddle-maker-page.scss',
})
export class RaddleMakerPage implements OnInit {
  protected readonly _raddleFormModel = signal<RaddleFormData>(createDefaultFormData());
  private readonly _savingToLocalStorageIsAllowed = signal(false);

  private readonly _dialogService = inject(MatDialog);

  private _nextStepId = 0;

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
      const dialogRef = this._dialogService.open(ConfirmResumeFormDialog);

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

  protected readonly _raddleForm = form(this._raddleFormModel, (schemaPath) => {
    required(schemaPath.lastWord, {message: 'This field is required'});

    applyEach(schemaPath.steps, (step) => {
      required(step.word, {message: 'This field is required'});
      required(step.clueToNextWord, {message: 'This field is required'});
      required(step.phraseToNextWord, {message: 'This field is required'});
    });
  });

  protected addStep() {
    this._raddleFormModel.update(formModel => ({
      ...formModel,
      steps: [
        ...formModel.steps,
        {
          id: this.getNextStepId(),
          word: '',
          clueToNextWord: '',
          phraseToNextWord: '',
        }
      ]
    }));
  }

  protected removeStep(stepId: string) {
    this._raddleFormModel.update(formModel => ({
      ...formModel,
      steps: formModel.steps.filter(step => step.id !== stepId)
    }));
  }

  protected generateAndShowRaddleLink() {
    const raddleSpec: RaddleSpec = createRaddleSpecFromForm(untracked(this._raddleFormModel));
    const raddleSpecJson = JSON.stringify(raddleSpec);
    const raddleSpecCompressed = lzString.compressToEncodedURIComponent(raddleSpecJson);

    this._dialogService.open(
      GeneratedLinkDialog,
      { data: raddleSpecCompressed }
    );
  }

  protected askThenResetForm() {
    const dialogRef = this._dialogService.open(ConfirmResetFormDialog);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._raddleFormModel.set(createDefaultFormData());
      }
    });
  }

  private getNextStepId(): string {
    const result = this._nextStepId.toString();
    this._nextStepId++;
    return result;
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
      {id: '0', word: '', clueToNextWord: '', phraseToNextWord: ''},
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
  id: string,
  word: string,
  clueToNextWord: string,
  phraseToNextWord: string,
}

const LOCAL_STORAGE_KEY = 'raddle-maker-form-data';
