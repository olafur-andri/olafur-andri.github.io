import {Component, computed, input, output} from '@angular/core';
import {FieldTree} from '@angular/forms/signals';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/list';
import {RaddleMakerClueRenderer} from '../raddle-maker-clue-renderer/raddle-maker-clue-renderer';
import {RaddleMakerPhraseRenderer} from '../raddle-maker-phrase-renderer/raddle-maker-phrase-renderer';

@Component({
  selector: 'app-raddle-maker-step-actions',
  imports: [
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider,
    RaddleMakerClueRenderer,
    RaddleMakerPhraseRenderer
  ],
  templateUrl: './raddle-maker-step-actions.html',
  styleUrl: './raddle-maker-step-actions.scss',
})
export class RaddleMakerStepActions {
  public readonly clueFormField = input.required<FieldTree<string, string>>();
  public readonly phraseFormField = input.required<FieldTree<string, string>>();
  public readonly fromWord = input.required<string>();
  public readonly toWord = input.required<string>();
  public readonly showDeleteAction = input.required<boolean>();

  public readonly editClueClick = output<void>();
  public readonly editPhraseClick = output<void>();
  public readonly deleteStepClick = output<void>();

  protected readonly _phraseText = computed(() => {
    const phraseValue = this.phraseFormField()().value();

    return phraseValue.trim() === ''
      ? '-'
      : phraseValue;
  });
}
