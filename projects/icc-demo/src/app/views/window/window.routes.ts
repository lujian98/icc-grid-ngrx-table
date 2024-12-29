import { Routes } from '@angular/router';
import { AppSimpleWindowComponent } from './demos/simple-window/simple-window.component';

import { AppWindowComponent } from './window.component';

export const AppWindowRoutes: Routes = [
  {
    path: '',
    component: AppWindowComponent,
    providers: [],
    children: [
      { path: 'simple-window', component: AppSimpleWindowComponent },
      {
        path: '**',
        redirectTo: 'simple-window',
      },
    ],
  },
];
