import {Component, effect, inject, signal} from '@angular/core';
import {MatIcon, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-choose-theme-button',
  imports: [
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './choose-theme-button.html',
  styleUrl: './choose-theme-button.scss',
})
export class ChooseThemeButton {
  protected readonly _allThemes: readonly Theme[] = [LIGHT_THEME, DARK_THEME, AUTO_THEME];
  protected readonly _currentTheme = signal<Theme>(this.getInitialTheme());

  private readonly _applyThemeEffect = effect(() => {
    const currentTheme = this._currentTheme();
    document.body.setAttribute('data-color-scheme', currentTheme.type);
  });

  private readonly _saveThemeEffect = effect(() => {
    const currentTheme = this._currentTheme();
    localStorage.setItem(LS_THEME_TYPE_KEY, currentTheme.type);
  });

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('paintbrush', sanitizer.bypassSecurityTrustHtml(PAINTBRUSH_ICON));
    iconRegistry.addSvgIconLiteral('sun', sanitizer.bypassSecurityTrustHtml(SUN_ICON));
    iconRegistry.addSvgIconLiteral('moon', sanitizer.bypassSecurityTrustHtml(MOON_ICON));
    iconRegistry.addSvgIconLiteral('desktop', sanitizer.bypassSecurityTrustHtml(DESKTOP_ICON));
  }

  private getInitialTheme() {
    const savedThemeType = localStorage.getItem(LS_THEME_TYPE_KEY);

    if (savedThemeType === null) {
      return AUTO_THEME;
    }

    const correspondingTheme = this._allThemes.find(theme => theme.type === savedThemeType);

    if (correspondingTheme === undefined) {
      return AUTO_THEME;
    }

    return correspondingTheme;
  }
}

interface Theme {
  /** A unique identifier for this theme */
  type: ThemeType,

  /** The name of this theme's corresponding SVG icon */
  svgIconName: string,

  /** This theme's user facing name */
  label: string,
}

type ThemeType = 'light' | 'dark' | 'auto';

const LIGHT_THEME: Theme = {
  type: 'light',
  svgIconName: 'sun',
  label: 'Light',
};

const DARK_THEME: Theme = {
  type: 'dark',
  svgIconName: 'moon',
  label: 'Dark',
};

const AUTO_THEME: Theme = {
  type: 'auto',
  svgIconName: 'desktop',
  label: 'Auto',
};

const LS_THEME_TYPE_KEY = 'theme-type';

const PAINTBRUSH_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
  </svg>
  `;

const SUN_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
  </svg>
  `;

const MOON_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
  </svg>
  `;

const DESKTOP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
  </svg>
  `;
