import { Routes } from '@angular/router';
import { AppSimpleSelectComponent } from './demos/simple-select/simple-select.component';

import { AppSelectComponent } from './select.component';

export const AppSelectRoutes: Routes = [
  {
    path: '',
    component: AppSelectComponent,
    providers: [],
    children: [
      { path: 'simple-select', component: AppSimpleSelectComponent },
      {
        path: '**',
        redirectTo: 'simple-select',
      },
    ],
  },
];
