import { Routes } from '@angular/router';
// import(“./about/about.component”).then((m) => m.AboutComponent),

/*
loadComponent: () =>

import(“./about/about.component”).then((m) => m.AboutComponent),

},
*/
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./examples/grid/grid-examples.module').then((m) => m.AppGridExamplesModule),
      },
      /*
      {
        path: 'grid2',
        loadComponent: () => import('./examples/grid/grid.component').then((m) => m.AppGridComponent),
      },*/
      {
        path: 'select',
        loadChildren: () => import('./examples/select/select-examples.module').then((m) => m.AppSelectExamplesModule),
      },
      {
        path: 'form',
        loadChildren: () => import('./examples/form/form-examples.module').then((m) => m.AppFormExamplesModule),
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
