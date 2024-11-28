import { Routes } from '@angular/router';

import { AppDefaultTreeGridComponent } from './demos/default-tree-grid.component';
import { AppCdkTreeGridComponent } from './demos/cdk-tree-grid.component';

import { AppTreeComponent } from './tree.component';

export const AppTreeGridRoutes: Routes = [
  {
    path: '',
    component: AppTreeComponent,
    providers: [],
    children: [
      { path: 'app-default-tree-grid', component: AppDefaultTreeGridComponent },
      { path: 'app-cdk-tree-grid', component: AppCdkTreeGridComponent },
      {
        path: '**',
        redirectTo: 'app-default-tree-grid',
      },
    ],
  },
];
