import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppLineChartDemoComponent } from './demos/line-chart-demo.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'line-chart', component: AppLineChartDemoComponent },
      {
        path: '**',
        redirectTo: 'line-chart',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppD3ExamplesRoutingModule {}
