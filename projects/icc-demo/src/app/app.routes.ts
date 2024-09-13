import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./examples/grid/grid-examples.module').then((m) => m.AppGridExamplesModule),
      },
      {
        path: 'select',
        loadChildren: () => import('./examples/select/select-examples.module').then((m) => m.AppSelectExamplesModule),
      },
      {
        path: '**',
        redirectTo: '/grid',
      },
    ],
  },
];
