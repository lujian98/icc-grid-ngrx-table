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
        loadChildren: () => import('./views/select/select.routes').then((m) => m.AppSelectRoutes),
      },
      {
        path: 'form',
        loadChildren: () => import('./views/form/form.routes').then((m) => m.AppFormRoutes),
      },
      {
        path: 'd3',
        loadChildren: () => import('./views/d3/d3.routes').then((m) => m.AppD3Routes),
      },
      {
        path: '**',
        redirectTo: 'grid',
      },
    ],
  },
];
