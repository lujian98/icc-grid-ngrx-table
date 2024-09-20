import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleSelectComponent } from './simple-select/simple-select.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'simple-select', component: AppSimpleSelectComponent },
      {
        path: '**',
        redirectTo: 'simple-select',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSelectExamplesRoutingModule {}
