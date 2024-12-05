import { Routes } from '@angular/router';
import { AppLayoutHorizontalComponent } from './demos/layout-horizontal.component';
import { AppHorizontalLeftCenterComponent } from './demos/horizontal-left-center.component';
import { AppHorizontalCenterRightComponent } from './demos/horizontal-center-right.component';
import { AppHorizontalLeftRightComponent } from './demos/horizontal-left-right.component';
import { AppLayoutHorizontalAllComponent } from './demos/layout-horizontal-all.component';

import { AppLayoutComponent } from './layout.component';

export const AppLayoutRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    providers: [],
    children: [
      { path: 'horizontal-layout', component: AppLayoutHorizontalComponent },
      { path: 'horizontal-left-center', component: AppHorizontalLeftCenterComponent },
      { path: 'horizontal-center-right', component: AppHorizontalCenterRightComponent },
      { path: 'horizontal-left-right', component: AppHorizontalLeftRightComponent },
      { path: 'layout-horizontal-all', component: AppLayoutHorizontalAllComponent },
      {
        path: '**',
        redirectTo: 'horizontal-layout',
      },
    ],
  },
];
