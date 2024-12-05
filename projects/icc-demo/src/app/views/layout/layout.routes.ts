import { Routes } from '@angular/router';
import { AppLayoutHorizontalComponent } from './demos/layout-horizontal.component';

import { AppLayoutComponent } from './layout.component';

export const AppLayoutRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    providers: [],
    children: [
      { path: 'horizontal-layout', component: AppLayoutHorizontalComponent },
      {
        path: '**',
        redirectTo: 'horizontal-layout',
      },
    ],
  },
];
