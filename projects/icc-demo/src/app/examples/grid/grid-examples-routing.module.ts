import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleGridComponent } from './remote-data/simple-grid.component';
import { AppGridFilterComponent } from './remote-data/grid-filter.component';
import { AppGridSortComponent } from './remote-data/grid-sort.component';
import { AppGridColumnResizeComponent } from './remote-data/grid-column-resize.component';
import { AppGridColumnReorderComponent } from './remote-data/grid-column-reorder.component';
import { AppGridColumnMenuComponent } from './remote-data/grid-column-menu.component';

import { AppGridTestComponent } from './remote-data/grid-test.component';
import { AppGridTest2Component } from './remote-data/grid-test2.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'remote-simple-grid', component: AppSimpleGridComponent, },
      { path: 'remote-grid-sort', component: AppGridSortComponent, },
      { path: 'remote-grid-filter', component: AppGridFilterComponent, },
      { path: 'remote-grid-column-resize', component: AppGridColumnResizeComponent, },
      { path: 'remote-grid-column-reorder', component: AppGridColumnReorderComponent, },
      { path: 'remote-grid-column-menu', component: AppGridColumnMenuComponent, },

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
