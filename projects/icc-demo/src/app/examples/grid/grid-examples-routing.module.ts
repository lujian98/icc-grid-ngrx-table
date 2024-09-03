import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleGridComponent } from './remote-data/simple-grid.component';
import { AppGridFilterComponent } from './remote-data/grid-filter.component';
import { AppGridSortComponent } from './remote-data/grid-sort.component';
import { AppGridColumnResizeComponent } from './remote-data/grid-column-resize.component';
import { AppGridColumnReorderComponent } from './remote-data/grid-column-reorder.component';
import { AppGridColumnMenuComponent } from './remote-data/grid-column-menu.component';
import { AppGridColumnHiddenComponent } from './remote-data/grid-column-hidden.component';
import { AppGridRemoteColumnConfigComponent } from './remote-data/grid-remote-column-config.component';
import { AppGridRowSelectionComponent } from './remote-data/grid-row-selection.component';
import { AppGridPageComponent } from './remote-data/grid-page.component';
import { AppGridVerticalScrollComponent } from './remote-data/grid-vertical-scroll.component';
import { AppGridHorizontalScrollComponent } from './remote-data/grid-horizontal-scroll.component';
import { AppGridRemoteVirtualScrollComponent } from './remote-data/grid-virtual-scroll.component';
import { AppGridOverallComponent } from './remote-data/grid-overall.component';

import { AppGridTest2Component } from './remote-data/grid-test2.component';

import { AppGridinMemoryTestComponent } from './in-memory-data/grid-in-memory-test.component';
import { AppGridVirtualScrollComponent } from './in-memory-data/grid-virtual-scroll.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'remote-simple-grid', component: AppSimpleGridComponent },
      { path: 'remote-grid-sort', component: AppGridSortComponent },
      { path: 'remote-grid-filter', component: AppGridFilterComponent },
      {
        path: 'remote-grid-column-resize',
        component: AppGridColumnResizeComponent,
      },
      {
        path: 'remote-grid-column-reorder',
        component: AppGridColumnReorderComponent,
      },
      {
        path: 'remote-grid-column-menu',
        component: AppGridColumnMenuComponent,
      },
      {
        path: 'remote-grid-column-hidden',
        component: AppGridColumnHiddenComponent,
      },
      {
        path: 'remote-grid-remote-column-config',
        component: AppGridRemoteColumnConfigComponent,
      },
      {
        path: 'remote-grid-row-selection',
        component: AppGridRowSelectionComponent,
      },
      { path: 'remote-grid-page', component: AppGridPageComponent },
      { path: 'remote-grid-vertical-scroll', component: AppGridVerticalScrollComponent },
      {
        path: 'remote-grid-horizontal-scroll',
        component: AppGridHorizontalScrollComponent,
      },
      {
        path: 'remote-grid-virtual-scroll',
        component: AppGridRemoteVirtualScrollComponent,
      },
      { path: 'remote-grid-overall', component: AppGridOverallComponent },
      {
        path: 'grid-test2',
        component: AppGridTest2Component,
      },
      { path: 'in-memory-grid-test', component: AppGridinMemoryTestComponent },
      { path: 'in-memory-grid-virtual-scroll', component: AppGridVirtualScrollComponent },
      {
        path: '**',
        redirectTo: 'remote-grid-overall',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppGridExamplesRoutingModule {}
