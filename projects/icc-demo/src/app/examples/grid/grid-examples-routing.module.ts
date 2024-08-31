import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleGridComponent } from './remote-data/simple-grid.component';
import { AppGridTestComponent } from './remote-data/grid-test.component';
import { AppGridTest2Component } from './remote-data/grid-test2.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'simple-grid',
        component: AppSimpleGridComponent,
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
