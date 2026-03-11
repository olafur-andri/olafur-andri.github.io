import {Component, inject, signal, untracked} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {form, FormField, required} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {RaddleMakerPhraseRenderer} from '../raddle-maker-phrase-renderer/raddle-maker-phrase-renderer';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-phrase-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    RaddleMakerPhraseRenderer,
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatHint,
    MatError,
    FormsModule
  ],
  templateUrl: './edit-phrase-dialog.html',
  styleUrl: './edit-phrase-dialog.scss',
})
export class EditPhraseDialog {
  protected readonly _dialogData: DialogData = inject(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<EditPhraseDialog>);

  private readonly _formModel = signal<FormData>({
    phrase: this._dialogData.initialPhrase,
  });

  protected readonly _form = form(this._formModel, (schemaPath) => {
    required(schemaPath.phrase, {message: 'This field is required'});
  });

  protected onFormSubmitted() {
    const formIsInvalid = untracked(() => this._form().invalid());
    if (formIsInvalid) {
      return;
    }

    const phrase = untracked(() => this._form.phrase().value());
    this._dialogRef.close(phrase);
  }
}

interface FormData {
  phrase: string;
}

interface DialogData {
  initialPhrase: string;
  fromWord: string;
  toWord: string;
}
