import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleGridComponent } from './remote-data/simple-grid.component';
import { AppGridFilterComponent } from './remote-data/grid-filter.component';
import { AppGridSortComponent } from './remote-data/grid-sort.component';

import { AppGridTestComponent } from './remote-data/grid-test.component';
import { AppGridTest2Component } from './remote-data/grid-test2.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'remote-simple-grid',
        component: AppSimpleGridComponent,
      },
      {
        path: 'remote-grid-sort',
        component: AppGridSortComponent,
      },
      {
        path: 'remote-grid-filter',
        component: AppGridFilterComponent,
      },

      {
        path: 'grid-test',
        component: AppGridTestComponent,
      },
      {
        path: 'grid-test2',
        component: AppGridTest2Component,
      },
      {
        path: '**',
        redirectTo: 'grid-test',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppGridExamplesRoutingModule { }
