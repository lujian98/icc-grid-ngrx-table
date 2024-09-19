import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppLineChartDemoComponent } from './demos/line-chart/line-chart-demo.component';
import { AppLineChartRemoteComponent } from './demos/line-chart/line-chart-remote.component';
import { AppMultiSeriesDemoComponent } from './demos/line-chart/multi-series-demo.component';
import { AppAreaChartDemoComponent } from './demos/area-chart/area-chart-demo.component';
import { AppStackedAreaChartDemoComponent } from './demos/area-chart/stacked-area-chart-demo.component';
import { AppStreamAreaChartDemoComponent } from './demos/area-chart/stream-area-chart-demo.component';

import { AppBarChartDemoComponent } from './demos/bar-chart/bar-chart-demo.component';
import { AppHistoricalBarChartComponent } from './demos/bar-chart/historical-bar-chart.component';
import { AppGroupedBarChartDemoComponent } from './demos/bar-chart/grouped-bar-chart-demo.component';
import { AppStackedBarChartDemoComponent } from './demos/bar-chart/stacked-bar-chart-demo.component';
import { AppLinearStackedBarChartComponent } from './demos/bar-chart/linear-stacked-bar-chart.component';

import { AppHorizontalBarDemoComponent } from './demos/horizontal-bar-chart/horizontal-bar-chart-demo.component';
import { AppGroupedHorizontalBarDemoComponent } from './demos/horizontal-bar-chart/grouped-horizontal-bar-chart-demo.component';
import { AppStackedHorizontalBarDemoComponent } from './demos/horizontal-bar-chart/stacked-horizontal-bar-chart-demo.component';
import { AppStackedNormalizedHorizontalBarDemoComponent } from './demos/horizontal-bar-chart/stacked-normalized-horizontal-bar-chart-demo.component';
import { AppStockHistoryDemoComponent } from './demos/horizontal-bar-chart/stock-history-demo.component';

import { AppBulletChartDemoComponent } from './demos/bullet-chart/bullet-chart-demo.component';
import { AppVerticalBulletChartDemoComponent } from './demos/bullet-chart/vertical-bullet-chart-demo.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'line-chart', component: AppLineChartDemoComponent },
      { path: 'line-chart-remote', component: AppLineChartRemoteComponent },
      { path: 'multi-series-chart', component: AppMultiSeriesDemoComponent },
      { path: 'area-chart', component: AppAreaChartDemoComponent },
      { path: 'stacked-area-chart', component: AppStackedAreaChartDemoComponent },
      { path: 'stream-area-chart', component: AppStreamAreaChartDemoComponent },
      { path: 'bar-chart', component: AppBarChartDemoComponent },
      { path: 'historical-bar-chart', component: AppHistoricalBarChartComponent },
      { path: 'grouped-bar-chart', component: AppGroupedBarChartDemoComponent },
      { path: 'stacked-bar-chart', component: AppStackedBarChartDemoComponent },
      { path: 'linear-stacked-bar-chart', component: AppLinearStackedBarChartComponent },
      { path: 'horizontal-bar-chart', component: AppHorizontalBarDemoComponent },
      { path: 'grouped-horizontal-bar-chart', component: AppGroupedHorizontalBarDemoComponent },
      { path: 'stacked-horizontal-bar-chart', component: AppStackedHorizontalBarDemoComponent },
      { path: 'stacked-normalized-horizontal-bar-chart', component: AppStackedNormalizedHorizontalBarDemoComponent },
      { path: 'stock-history-demo', component: AppStockHistoryDemoComponent },
      { path: 'bullet-chart-demo', component: AppBulletChartDemoComponent },
      { path: 'vertical-bullet-chart-demo', component: AppVerticalBulletChartDemoComponent },

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
