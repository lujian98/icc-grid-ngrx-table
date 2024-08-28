import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IccGridTestComponent } from './examples/grid/grid-test/grid-test.component';
import { IccGridTest2Component } from './examples/grid/grid-test2/grid-test2.component';

const routes: Routes = [
  {
    path: 'grid-test',
    component: IccGridTestComponent,
  },
  {
    path: 'grid-test2',
    component: IccGridTest2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
