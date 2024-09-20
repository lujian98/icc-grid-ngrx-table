import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppSimpleFromDemoComponent } from './demos/simple-form.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'simple-form', component: AppSimpleFromDemoComponent },
      {
        path: '**',
        redirectTo: 'simple-form',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppFormExamplesRoutingModule {}
