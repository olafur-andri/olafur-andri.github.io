import {Routes} from '@angular/router';
import { FrontPage } from './front-page/front-page';
import { RaddleGamePage } from './raddle/raddle-game-page/raddle-game-page';
import { RaddleMakerPage } from './raddle/raddle-maker-page/raddle-maker-page';
import {RaddleFrontPage} from './raddle/raddle-front-page/raddle-front-page';

export const routes: Routes = [
  {
    path: '',
    component: FrontPage,
    title: 'Ólafur Andri'
  },
  {
    path: 'raddle',
    component: RaddleFrontPage,
    title: 'Welcome To Custom Raddles'
  },
  {
    path: 'raddle/:spec',
    component: RaddleGamePage,
    title: 'Custom Raddle Game'
  },
  {
    path: 'raddle-maker',
    component: RaddleMakerPage,
    title: 'Custom Raddle Maker'
  }
];
