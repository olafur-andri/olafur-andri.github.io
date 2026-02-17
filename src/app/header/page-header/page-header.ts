import { Component } from '@angular/core';
import {ChooseThemeButton} from "../choose-theme-button/choose-theme-button";
import {Logo} from "../logo/logo";
import {ResponsiveProfileLinks} from "../responsive-profile-links/responsive-profile-links";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-header',
    imports: [
    ChooseThemeButton,
    Logo,
    ResponsiveProfileLinks,
    RouterLink
],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {

}
