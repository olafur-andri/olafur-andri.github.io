import {Component, input} from '@angular/core';
import {ClueSpecialToken} from '../../clue-special-token/clue-special-token';

@Component({
  selector: 'app-raddle-maker-phrase-renderer',
  imports: [
    ClueSpecialToken
  ],
  templateUrl: './raddle-maker-phrase-renderer.html',
  styleUrl: './raddle-maker-phrase-renderer.scss',
})
export class RaddleMakerPhraseRenderer {
  public readonly fromWord = input.required<string>();
  public readonly toWord = input.required<string>();
  public readonly phrase = input.required<string>();
}
