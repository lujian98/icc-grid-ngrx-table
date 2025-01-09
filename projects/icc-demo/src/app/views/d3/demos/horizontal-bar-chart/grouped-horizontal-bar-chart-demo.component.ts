import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccD3ChartConfig, IccD3Options, IccD3Component, defaultD3Config } from '@icc/ui/d3';

@Component({
  selector: 'app-grouped-horizontal-bar-chart-demo',
  styles: [':host {width: 100%; height: 100%; display: flex;}'],
  template: `
    <icc-d3 [chartConfigs]="chartConfigs" [data]="data"></icc-d3>
    <icc-d3 [chartConfigs]="chartConfigs2" [data]="data"></icc-d3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccD3Component],
})
export class AppGroupedHorizontalBarDemoComponent implements OnInit {
  chartConfigs: IccD3ChartConfig[] = [
    {
      chartType: 'groupedHorizontalBarChart',
      xScaleType: 'linear',
      yScaleType: 'band',
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      x: (d: any) => d.value,
      y: (d: any) => d.label,
      drawColor: (d: any, i: any) => d.key,
    },
  ];

  chartConfigs2: IccD3ChartConfig[] = [
    {
      chartType: 'groupedBarChart',
      yScaleType: 'linear',
      xScaleType: 'band',
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      x: (d: any) => d.label,
      y: (d: any) => d.value,
      drawColor: (d: any, i: any) => d.key,
    },
  ];

  data = [
    {
      key: 'Series1',
      // color: 'blue',
      values: [
        {
          label: 'Group A',
          value: -1.8746444827653,
        },
        {
          label: 'Group B',
          value: -8.0961543492239,
        },
        {
          label: 'Group C',
          value: -0.57072943117674,
        },
        {
          label: 'Group D',
          value: -2.4174010336624,
        },
        {
          label: 'Group E',
          value: -0.72009071426284,
        },
        {
          label: 'Group F',
          value: 8.77154485523777,
        },
        {
          label: 'Group G',
          value: -0.90152097798131,
        },
        {
          label: 'Group H',
          value: -0.91445417330854,
        },
        {
          label: 'Group I',
          value: -0.055746319141851,
        },
      ],
    },
    {
      key: 'Series2',
      // color: '#1f77b4',
      values: [
        {
          label: 'Group A',
          value: 25.307646510375,
        },
        {
          label: 'Group B',
          value: 16.756779544553,
        },
        {
          label: 'Group C',
          value: 18.451534877007,
        },
        {
          label: 'Group D',
          value: 8.6142352811805,
        },
        {
          label: 'Group E',
          value: 7.8082472075876,
        },
        {
          label: 'Group F',
          value: 5.259101026956,
        },
        {
          label: 'Group G',
          value: 0.30947953487127,
        },
        {
          label: 'Group H',
          value: 0,
        },
        {
          label: 'Group I',
          value: 0,
        },
      ],
    },
  ];

  ngOnInit() {}
}
