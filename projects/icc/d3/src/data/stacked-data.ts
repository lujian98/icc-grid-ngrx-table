import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import { IccScaleDraw } from '../draw/scale-draw';
import { IccD3ChartConfig } from '../model';

export class IccStackedData<T> {
  offset = 'stackOffsetDiverging';
  normalized = false;

  constructor(
    private drawPanel: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    private scale: IccScaleDraw<T>,
    private chart: IccD3ChartConfig,
    private chartType: string,
  ) {
    if (
      this.chartType === 'stackedNormalizedAreaChart' ||
      this.chartType === 'stackedNormalizedBarChart' ||
      this.chartType === 'stackedNormalizedHorizontalBarChart'
    ) {
      this.offset = 'stackOffsetExpand';
      this.normalized = true;
    } else if (this.chartType === 'stackedStreamAreaChart') {
      this.offset = 'stackOffsetWiggle';
    }
  }

  public getStackedData(data: T[], isStackedY): any[] {
    let ndata = [];
    data.forEach((d) => {
      ndata = this.chart.y0(d).map((v, i) => {
        if (ndata.length === i) {
          ndata.push({});
        }
        const o = ndata[i];
        if (isStackedY) {
          for (const [key, value] of Object.entries(v)) {
            if (this.chart.x(v) === value) {
              o[key] = value;
            }
          }
          o[this.chart.x0(d)] = this.chart.y(v);
        } else {
          for (const [key, value] of Object.entries(v)) {
            if (this.chart.y(v) === value) {
              o[key] = value;
            }
          }
          o[this.chart.x0(d)] = this.chart.x(v);
        }
        return o;
      });
    });
    const keys = Object.getOwnPropertyNames(ndata[0]).slice(1); // TODO if [0] not include all keys? (d3.stackOffsetExpand)
    const stacks = d3Shape.stack().keys(keys);
    if (this.offset === 'stackOffsetDiverging') {
      stacks.offset(d3Shape.stackOffsetDiverging);
    } else if (this.offset === 'stackOffsetExpand') {
      stacks.offset(d3Shape.stackOffsetExpand);
    } else if (this.offset === 'stackOffsetWiggle') {
      stacks.offset(d3Shape.stackOffsetWiggle).order(d3Shape.stackOrderInsideOut);
    }
    return stacks(ndata);
  }

  setStackedYDomain(data: T[]): void {
    this.scale.setYDomain(data, this.normalized ? 'normalized' : 'stacked');
    this.drawPanel.select('.axis--y').call(this.scale.scaleY.axis);
    this.drawPanel.select('.axis--ygrid').call(this.scale.scaleY.grid);
    this.drawPanel.select('.contextBrushY').select('.axis--y').call(this.scale.scaleY.brushYAxis);
  }

  setStackedXDomain(data: T[]): void {
    this.scale.setXDomain(data, this.normalized ? 'normalized' : 'stacked');
    this.drawPanel.select('.axis--x').call(this.scale.scaleX.axis);
    this.drawPanel.select('.axis--xgrid').call(this.scale.scaleX.grid);
    this.drawPanel.select('.context').select('.axis--x').call(this.scale.scaleX.brushXAxis);
  }
}
