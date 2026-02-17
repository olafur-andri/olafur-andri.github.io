import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from './header/page-header/page-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('olafur-andri.github.io');
}
