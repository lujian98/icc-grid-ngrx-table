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
        path: 'd3',
        loadChildren: () => import('./examples/d3/d3-examples.module').then((m) => m.AppD3ExamplesModule),
      },
      {
        path: '**',
        redirectTo: '/grid',
      },
    ],
  },
];
