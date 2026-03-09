import {Component, computed, ElementRef, inject, signal, untracked, viewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {form, FormField, required} from '@angular/forms/signals';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {RaddleMakerClueRenderer} from '../raddle-maker-clue-renderer/raddle-maker-clue-renderer';

/** The dialog for when the user is editing a clue in the Raddle Maker */
@Component({
  selector: 'app-edit-clue-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
    MatHint,
    MatFormField,
    FormField,
    MatError,
    MatLabel,
    RaddleMakerClueRenderer
  ],
  templateUrl: './edit-clue-dialog.html',
  styleUrl: './edit-clue-dialog.scss',
})
export class EditClueDialog {
  private readonly _clueTextAreaRef = viewChild<ElementRef<HTMLTextAreaElement>>('clueInput');
  private readonly _clueTextArea = computed(() => this._clueTextAreaRef()?.nativeElement);
  protected readonly _dialogData: DialogData = inject(MAT_DIALOG_DATA);

  private readonly _formModel = signal<FormData>({
    clue: this._dialogData.initialClue,
  });

  protected readonly _form = form(this._formModel, (schemaPath) => {
    required(schemaPath.clue, {message: 'This field is required'});
  });

  protected insertTextIntoTextArea(text: string) {
    const textArea = untracked(this._clueTextArea);

    if (textArea === undefined) {
      return;
    }

    const start = textArea.selectionStart || 0;
    const end = textArea.selectionEnd || 0;
    const value = textArea.value;

    // Insert "{from}" at the cursor position
    textArea.value = value.substring(0, start) + text + value.substring(end);
    this._formModel.set({clue: textArea.value});

    // Put the cursor back in the right place
    textArea.selectionStart = textArea.selectionEnd = start + text.length;
  }
}

interface FormData {
  clue: string;
}

interface DialogData {
  initialClue: string;
  fromWord: string;
  toWord: string;
}
