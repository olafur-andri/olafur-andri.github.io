import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent
} from '@angular/material/dialog';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-generated-link-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    RouterLink,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './generated-link-dialog.html',
  styleUrl: './generated-link-dialog.scss',
})
export class GeneratedLinkDialog {
  protected readonly compressedRaddleSpec: string = inject(MAT_DIALOG_DATA);
}
