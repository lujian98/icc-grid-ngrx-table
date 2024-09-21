import { Routes } from '@angular/router';
import { AppSimpleFromDemoComponent } from './demos/simple-form.component';
import { AppFormComponent } from './form.component';

export const AppFormRoutes: Routes = [
  {
    path: '',
    component: AppFormComponent,
    providers: [],
    children: [
      { path: 'simple-form', component: AppSimpleFromDemoComponent },
      {
        path: '**',
        redirectTo: 'simple-form',
      },
    ],
  },
];
