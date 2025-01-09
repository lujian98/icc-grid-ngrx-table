import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccD3ChartConfig, IccD3Options, IccD3Component, defaultD3Config } from '@icc/ui/d3';

@Component({
  selector: 'app-line-chart-demo',
  styles: [':host {width: 100%; height: 100%; display: flex; flex-direction: column;}'],
  template: `
    <div style="height: 100%; display: flex;">
      <icc-d3 [d3Config]="d3Config1" [chartConfigs]="chartConfigs1" [data]="data"></icc-d3>
      <icc-d3 [d3Config]="d3Config2" [chartConfigs]="chartConfigs2" [data]="data"></icc-d3>
    </div>
    <div style="height: 100%; display: flex; margin-top: 20px;">
      <icc-d3 [chartConfigs]="chartConfigs3" [data]="data"></icc-d3>
      <icc-d3 [chartConfigs]="chartConfigs4" [data]="data"></icc-d3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccD3Component],
})
export class AppLineChartDemoComponent implements OnInit {
  data: any;
  options: IccD3Options = {
    margin: { top: 50, right: 80, bottom: 10, left: 10 },
  };

  d3Config1 = {
    //...defaultD3Config,
    options: this.options,
  };

  options2: IccD3Options = {
    margin: { left: 80 },
  };

  d3Config2 = {
    //...defaultD3Config,
    options: this.options2,
  };

  chartConfigs1: IccD3ChartConfig[] = [
    {
      chartType: 'lineChart',
      xScaleType: 'linear',
      useInteractiveGuideline: true,
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      drawColor: (d: any, i: number) => d.key,
      xAxis: {
        position: 'top',
        axisLabelDistance: -30,
        axisLabel: 'Time (ms)',
        // rotate: -90
      },
      yAxis: {
        position: 'right',
        axisLabelDistance: 50,
        axisLabel: 'Voltage (v)',
        rotate: -90,
      },
      zoom: {
        enabled: true,
        horizontalOff: false,
        horizontalBrushShow: false,
        verticalOff: false,
        verticalBrushShow: false,
      },
    },
    {
      chartType: 'areaChart',
    },
  ];

  chartConfigs2: IccD3ChartConfig[] = [
    {
      chartType: 'lineChart',
      xScaleType: 'linear',
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      drawColor: (d: any, i: number) => d.key,

      xAxis: {
        axisLabel: 'Time (ms)',
        textAnchor: 'start',
      },
      yAxis: {
        axisLabel: 'Voltage (v)',
        textAnchor: 'start',
      },
      zoom: {
        enabled: true,
        horizontalOff: false,
        horizontalBrushShow: true,
        verticalOff: true,
        verticalBrushShow: false,
      },
    },
    {
      chartType: 'areaChart',
    },
  ];

  chartConfigs3: IccD3ChartConfig[] = [
    {
      chartType: 'lineChart',
      xScaleType: 'linear',
      useInteractiveGuideline: true,
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      drawColor: (d: any, i: number) => d.key,
      xAxis: {
        axisLabel: 'Time (ms)',
        textAnchor: 'end',
      },
      yAxis: {
        axisLabel: 'Voltage (v)',
        textAnchor: 'end',
        rotate: -90,
        axisLabelDistance: -40,
      },
      zoom: {
        enabled: true,
        horizontalOff: true,
        horizontalBrushShow: false,
        verticalOff: false,
        verticalBrushShow: true,
      },
    },
    {
      chartType: 'areaChart',
    },
  ];

  chartConfigs4: IccD3ChartConfig[] = [
    {
      chartType: 'lineChart',
      xScaleType: 'linear',
      useInteractiveGuideline: true,
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      drawColor: (d: any, i: number) => d.key,
      xAxis: {
        axisLabel: 'Time (ms)',
      },
      yAxis: {
        axisLabel: 'Voltage (v)',
      },
      zoom: {
        enabled: true,
        horizontalOff: false,
        horizontalBrushShow: true,
        verticalOff: false,
        verticalBrushShow: true,
      },
    },
    {
      chartType: 'areaChart',
    },
  ];

  ngOnInit() {
    this.data = this.getData();
  }

  private getData(): any[] {
    const sin = [];
    const sin2 = [];
    const cos = [];
    for (let i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / 10) });
      sin2.push({ x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
      cos.push({ x: i, y: 0.5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
    }
    return [
      {
        values: sin, // values - represents the array of {x,y} data points
        key: 'Sine Wave', // key  - the name of the series.
        color: '#ff7f0e', // color - optional: choose your own line color.
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        chartType: 'areaChart', // area - set to true if you want this line to turn into a filled area chart.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c',
      },
    ];
  }
}
