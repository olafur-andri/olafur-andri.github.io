import {Component, computed, inject, input, output} from '@angular/core';
import {FieldTree} from '@angular/forms/signals';
import {MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconRegistry} from '@angular/material/icon';
import {ClueToken, tokenizeClue} from '../../tokenize-clue';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-raddle-maker-step-separator',
  imports: [
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './raddle-maker-step-separator.html',
  styleUrl: './raddle-maker-step-separator.scss',
})
export class RaddleMakerStepSeparator {
  public readonly clueFormField = input.required<FieldTree<string, string>>();
  public readonly phraseFormField = input.required<FieldTree<string, string>>();
  public readonly fromWord = input.required<string>();
  public readonly toWord = input.required<string>();

  public readonly editClick = output<void>();

  protected readonly _clueTokens = computed<ClueToken[]>(() => {
    const clueFormField = this.clueFormField()();
    const clueValue = clueFormField.value();

    if (clueValue.trim() === '') {
      return [{type: 'normal', text: '-'}];
    }

    const tokens = tokenizeClue(clueValue, this.fromWord(), this.toWord());

    return tokens.map(token => ({
      type: token.type,
      text: token.text || '-',
    }));
  });

  protected readonly _phraseText = computed(() => {
    const phraseValue = this.phraseFormField()().value();

    return phraseValue.trim() === ''
      ? '-'
      : phraseValue;
  });

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('arrow_cool_down', sanitizer.bypassSecurityTrustHtml(ARROW_COOL_DOWN_ICON));
  }
}

const ARROW_COOL_DOWN_ICON =
  `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M480-80 200-360l56-57 184 184v-287h80v287l184-183 56 56L480-80Zm-40-520v-120h80v120h-80Zm0-200v-80h80v80h-80Z"/>
  </svg>`;
