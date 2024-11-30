import { Routes } from '@angular/router';

import { AppDefaultTreeGridComponent } from './demos/default-tree-grid.component';
import { AppTreeRemoteDataComponent } from './demos/tree-remote-data.component';
import { AppTreeRemoteColumnDataComponent } from './demos/tree-remote-conlumn-data.component';

import { AppCdkTreeGridComponent } from './demos/cdk-tree-grid.component';

import { AppTreeComponent } from './tree.component';

export const AppTreeGridRoutes: Routes = [
  {
    path: '',
    component: AppTreeComponent,
    providers: [],
    children: [
      { path: 'app-default-tree-grid', component: AppDefaultTreeGridComponent },
      { path: 'app-tree-remote-data', component: AppTreeRemoteDataComponent },
      { path: 'app-tree-remote-conlumn-data', component: AppTreeRemoteColumnDataComponent },

      { path: 'app-cdk-tree-grid', component: AppCdkTreeGridComponent },
      {
        path: '**',
        redirectTo: 'app-default-tree-grid',
      },
    ],
  },
];
