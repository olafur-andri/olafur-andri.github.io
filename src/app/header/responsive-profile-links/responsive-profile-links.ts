import {Component, computed, inject, signal} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-responsive-profile-links',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './responsive-profile-links.html',
  styleUrl: './responsive-profile-links.scss',
})
export class ResponsiveProfileLinks {
  private readonly _router = inject(Router);
  private readonly _snackbarService = inject(MatSnackBar);

  private readonly _url = signal(this._router.url);

  protected readonly _urlMode = computed<UrlMode>(() => {
    const url = this._url();

    if (url.startsWith('/raddle/')) {
      return 'raddle-game';
    }

    if (url.startsWith('/raddle-maker')) {
      return 'raddle-maker';
    }

    return 'front-page';
  });

  constructor() {
    // icon stuff
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('linkedin', sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICON));
    iconRegistry.addSvgIconLiteral('github', sanitizer.bypassSecurityTrustHtml(GITHUB_ICON));

    // react to URL changes
    this._router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this._url.set(this._router.url));
  }

  protected async copyUrlToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this._snackbarService.open('Copied URL to clipboard', 'Dismiss', {duration: 2000});
    } catch (e) {
      this._snackbarService.open('Failed to copy URL to clipboard', 'Dismiss', {duration: 2000});
    }
  }
}

type UrlMode = 'front-page' | 'raddle-game' | 'raddle-maker';

const LINKEDIN_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
  </svg>
  `;

const GITHUB_ICON =
  `
  <svg viewBox="0 0 20 20" aria-hidden="true" class="docs-github-logo">
    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z" fill="currentColor" fill-rule="evenodd"></path>
  </svg>
  `;
