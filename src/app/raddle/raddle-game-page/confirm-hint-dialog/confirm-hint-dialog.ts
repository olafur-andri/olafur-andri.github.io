import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  selector: 'app-raddle-confirm-hint-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatAnchor, MatDialogClose, MatButton],
  templateUrl: './confirm-hint-dialog.html',
  styleUrl: './confirm-hint-dialog.scss',
})
export class ConfirmHintDialog {
  protected readonly data: ConfirmHintDialogData = inject(MAT_DIALOG_DATA);
}

export interface ConfirmHintDialogData {
  title: string;
  content: string;
}
