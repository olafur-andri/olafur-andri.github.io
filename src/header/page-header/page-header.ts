import { Component } from '@angular/core';
import {ChooseThemeButton} from "../choose-theme-button/choose-theme-button";
import {Logo} from "../logo/logo";
import {ResponsiveProfileLinks} from "../responsive-profile-links/responsive-profile-links";

@Component({
  selector: 'app-page-header',
    imports: [
        ChooseThemeButton,
        Logo,
        ResponsiveProfileLinks
    ],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {

}
