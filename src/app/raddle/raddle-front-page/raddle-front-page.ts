import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-raddle-front-page',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './raddle-front-page.html',
  styleUrl: './raddle-front-page.scss',
})
export class RaddleFrontPage {

}
