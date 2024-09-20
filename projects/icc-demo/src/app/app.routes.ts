import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./views/grid/grid.routes').then((m) => m.AppGridRoutes),
      },
      {
        path: 'select',
        loadChildren: () => import('./views/select/select-examples.module').then((m) => m.AppSelectExamplesModule),
      },
      {
        path: 'form',
        loadChildren: () => import('./views/form/form-examples.module').then((m) => m.AppFormExamplesModule),
      },
      {
        path: 'd3',
        loadChildren: () => import('./views/d3/d3.routes').then((m) => m.AppD3Routes),
      },
      /*
      {
        path: 'd3',
        loadChildren: () => import('./views/d3/d3-examples.module').then((m) => m.AppD3ExamplesModule),
      },*/
      {
        path: '**',
        redirectTo: '/grid',
      },
    ],
  },
];
