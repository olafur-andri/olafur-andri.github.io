import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-step-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirm-delete-step-dialog.html',
  styleUrl: './confirm-delete-step-dialog.scss',
})
export class ConfirmDeleteStepDialog {
  private readonly _dialogData: ConfirmDeleteStepDialogData = inject(MAT_DIALOG_DATA);

  protected readonly _dialogTitle = this._dialogData.stepWord.trim() === ''
    ? 'Delete step?'
    : `Delete ${this._dialogData.stepWord.trim().toUpperCase()}?`;
}

export interface ConfirmDeleteStepDialogData {
  stepWord: string;
}
