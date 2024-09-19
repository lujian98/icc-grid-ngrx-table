import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppLineChartDemoComponent } from './demos/line-chart/line-chart-demo.component';
import { AppLineChartRemoteComponent } from './demos/line-chart/line-chart-remote.component';
import { AppMultiSeriesDemoComponent } from './demos/line-chart/multi-series-demo.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'line-chart', component: AppLineChartDemoComponent },
      { path: 'line-chart-remote', component: AppLineChartRemoteComponent },
      { path: 'multi-series-chart', component: AppMultiSeriesDemoComponent },
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
