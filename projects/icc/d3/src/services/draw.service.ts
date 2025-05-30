import { Injectable } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Dispatch from 'd3-dispatch';
import { IccScaleDraw, IccAbstractDraw, IccView } from '../draws';
import { IccD3ChartConfig } from '../models';
import {
  IccLineChart,
  IccAreaChart,
  IccbulletChart,
  IccStackedAreaChart,
  IccBarChart,
  IccGroupedBarChart,
  IccStackedBarChart,
  IccHorizontalBarChart,
  IccGroupedHorizontalBarChart,
  IccStackedHorizontalBarChart,
  IccPieChart,
  IccCandleStickBarChart,
} from '../charts';

import { IccRadialGauge } from '../gauge';

@Injectable()
export class IccDrawServie<T> {
  componentMapper = {
    lineChart: IccLineChart,
    // lineChartY2: IccLineChart,
    areaChart: IccAreaChart,
    bulletChart: IccbulletChart,
    stackedAreaChart: IccStackedAreaChart,
    stackedNormalizedAreaChart: IccStackedAreaChart,
    stackedStreamAreaChart: IccStackedAreaChart,

    barChart: IccBarChart,
    groupedBarChart: IccGroupedBarChart,
    stackedBarChart: IccStackedBarChart,
    stackedNormalizedBarChart: IccStackedBarChart,

    horizontalBarChart: IccHorizontalBarChart,
    groupedHorizontalBarChart: IccGroupedHorizontalBarChart,
    stackedHorizontalBarChart: IccStackedHorizontalBarChart,
    stackedNormalizedHorizontalBarChart: IccStackedHorizontalBarChart,

    pieChart: IccPieChart,
    candleStickBarChart: IccCandleStickBarChart,

    radialGauge: IccRadialGauge,
  };

  constructor() {}

  getDraw(
    view: IccView,
    scale: IccScaleDraw<T>,
    dispatch: d3Dispatch.Dispatch<{}>,
    chart: IccD3ChartConfig,
  ): IccAbstractDraw<T> {
    // @ts-ignore
    let component = this.componentMapper[chart.chartType];
    if (!component) {
      component = this.componentMapper.lineChart;
    }
    const componentRef = new component(view, scale, dispatch, chart);
    return componentRef;
  }
}
