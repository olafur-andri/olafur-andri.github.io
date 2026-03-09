import {Component, computed, input} from '@angular/core';
import {ClueToken, tokenizeClue} from '../../tokenize-clue';

@Component({
  selector: 'app-raddle-maker-clue-renderer',
  imports: [],
  templateUrl: './raddle-maker-clue-renderer.html',
  styleUrl: './raddle-maker-clue-renderer.scss',
})
export class RaddleMakerClueRenderer {
  public readonly clue = input.required<string>();
  public readonly fromWord = input.required<string>();
  public readonly toWord = input.required<string>();

  protected readonly _clueTokens = computed<ClueToken[]>(() => {
    const clue = this.clue();

    if (clue.trim() === '') {
      return [{type: 'normal', text: '-'}];
    }

    const tokens = tokenizeClue(clue, this.fromWord(), this.toWord());

    return tokens.map(token => ({
      type: token.type,
      text: token.text || '-',
    }));
  });
}
