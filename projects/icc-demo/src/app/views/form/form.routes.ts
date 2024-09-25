import { Routes } from '@angular/router';
import { AppSimpleFromDemoComponent } from './demos/simple-form.component';
import { AppThemeFormDemoComponent } from './demos/theme-form.component';
import { AppFromPageDemoComponent } from './demos/form-page.component';

import { AppFormComponent } from './form.component';

export const AppFormRoutes: Routes = [
  {
    path: '',
    component: AppFormComponent,
    providers: [],
    children: [
      { path: 'simple-form', component: AppSimpleFromDemoComponent },
      { path: 'theme-form', component: AppThemeFormDemoComponent },
      { path: 'form-page', component: AppFromPageDemoComponent },
      {
        path: '**',
        redirectTo: 'simple-form',
      },
    ],
  },
];
