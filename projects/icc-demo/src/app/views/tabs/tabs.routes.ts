import { Routes } from '@angular/router';
import { AppSimpleTabsComponent } from './demos/simple-tabs/simple-tabs.component';

import { AppTabsComponent } from './tabs.component';

export const AppTabsRoutes: Routes = [
  {
    path: '',
    component: AppTabsComponent,
    providers: [],
    children: [
      { path: 'simple-tabs', component: AppSimpleTabsComponent },
      {
        path: '**',
        redirectTo: 'simple-tabs',
      },
    ],
  },
];
