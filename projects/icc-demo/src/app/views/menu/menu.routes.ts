import { Routes } from '@angular/router';
import { AppSimpleMenuComponent } from './demos/simple-menu/simple-menu.component';

import { AppMenuComponent } from './menu.component';

export const AppMenuRoutes: Routes = [
  {
    path: '',
    component: AppMenuComponent,
    providers: [],
    children: [
      { path: 'simple-menu', component: AppSimpleMenuComponent },
      {
        path: '**',
        redirectTo: 'simple-menu',
      },
    ],
  },
];
