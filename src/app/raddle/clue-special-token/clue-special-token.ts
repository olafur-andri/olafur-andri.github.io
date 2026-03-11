import {Component, input} from '@angular/core';

@Component({
  selector: 'app-clue-special-token',
  imports: [],
  templateUrl: './clue-special-token.html',
  styleUrl: './clue-special-token.scss',
})
export class ClueSpecialToken {
  public readonly text = input.required<string>();
  public readonly type = input.required<'to' | 'from'>();
}
