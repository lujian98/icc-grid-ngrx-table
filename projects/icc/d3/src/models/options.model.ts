import * as d3Format from 'd3-format';
import { IccD3BulletChartOptions } from './bullet.model';
import { IccD3RadialGaugeOptions } from './gauge.model';
import { IccD3LegendOptions, DEFAULT_D3LEGEND_OPTIONS } from './legend.model';
import { IccD3PieChartOptions } from './pie.model';
import { IccD3PopoverOptions, DEFAULT_D3POPOVER_OPTIONS } from './popover.model';
import { IccD3ZoomOptions, DEFAULT_D3ZOOM_OPTIONS } from './zoom.model';
import { IccD3AxisOptions, DEFAULT_D3XAXIS_OPTIONS, DEFAULT_D3YAXIS_OPTIONS } from './axis.model';

export interface IccPosition {
  x: number;
  y: number;
}

export interface IccMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface IccD3Options {
  margin?: IccMargin;
  width?: string | number;

  brushYWidth?: number;
  drawHeight?: number;
  drawWidth?: number;
  drawHeight2?: number; // bottom brush height
}

export const DEFAULT_CHART_OPTIONS: IccD3Options = {
  margin: { top: 10, right: 10, bottom: 40, left: 50 },
  width: '100%',
  brushYWidth: 50,
  drawHeight2: 50,
};

export interface IccD3ChartConfig {
  chartType?: string;
  panelId?: string;

  xAxisId?: string;
  yAxisId?: string;

  useInteractiveGuideline?: boolean;
  xScaleType?: string;
  yScaleType?: string;

  x0?: Function;
  y0?: Function;
  x?: Function;
  y?: Function;

  colors?: string[];
  drawColor?: Function;
  barColor?: Function;
  duration?: number;

  axisEnabled?: boolean;
  xAxis?: IccD3AxisOptions;
  yAxis?: IccD3AxisOptions;
  legend?: IccD3LegendOptions;
  bullet?: IccD3BulletChartOptions;
  pie?: IccD3PieChartOptions;
  radialGauge?: IccD3RadialGaugeOptions;
  popover?: IccD3PopoverOptions;
  zoom?: IccD3ZoomOptions;

  // margin?: IccMargin;  // TODO ?????
  // width?: string | number;

  // brushYWidth?: number;
  // legendHeight?: number; // TODO
  // drawHeight?: number;
  // drawWidth?: number;
  // drawHeight2?: number; // bottom brush height
}

export const DEFAULT_CHART_CONFIGS: IccD3ChartConfig = {
  chartType: 'lineChart',
  useInteractiveGuideline: false,
  xScaleType: 'time',
  yScaleType: 'linear',
  x0: (d: any) => d.key,
  y0: (d: any) => d?.values,
  x: (d: any) => d.x,
  y: (d: any) => d.y,
  drawColor: (d: any) => d.key,
  duration: 0,
  axisEnabled: true,
  xAxis: DEFAULT_D3XAXIS_OPTIONS,
  yAxis: DEFAULT_D3YAXIS_OPTIONS,
  legend: DEFAULT_D3LEGEND_OPTIONS,
  popover: DEFAULT_D3POPOVER_OPTIONS,
  zoom: DEFAULT_D3ZOOM_OPTIONS,
};
