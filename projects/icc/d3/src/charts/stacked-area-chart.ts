import * as d3Shape from 'd3-shape';
import { IccAbstractDraw } from '../draws/abstract-draw';
import { IccStackedData } from '../data/stacked-data';
import { IccScale, IccScaleLinear } from '../models';

export class IccStackedAreaChart<T> extends IccAbstractDraw<T> {
  // @ts-ignore
  drawChart(data: T[]): void {
    this.isStacked = true;
    this.reverse = true;
    const stacked = new IccStackedData(this.drawPanel, this.scale, this.chart, this.chartType);
    this.normalized = stacked.normalized;
    const stackdata = data.length > 0 ? stacked.getStackedData(data, true) : [];
    if (data.length > 0) {
      stacked.setStackedYDomain(stackdata);
    }
    super.drawChart(stackdata);
  }

  drawContents(drawName: string, scaleX: IccScale, scaleY: IccScaleLinear): void {
    const drawContents = this.drawPanel
      .select(drawName)
      .selectAll('g')
      .data(this.data)
      .join('g')
      .append('path')
      .attr('class', 'stackedarea draw')
      .attr('fill-opacity', 0.5);

    if (drawName === `.${this.chartType}`) {
      drawContents
        .on('mouseover', (e, d) => this.legendMouseover(e, d, true))
        .on('mouseout', (e, d) => this.legendMouseover(e, d, false));
    }
    this.redrawContent(drawName, scaleX, scaleY);
  }

  redrawContent(drawName: string, scaleX: IccScale, scaleY: IccScaleLinear): void {
    const drawContent = d3Shape
      .area()
      .x((d: any) => scaleX(this.chart.x!(d.data))!)
      .y0((d) => scaleY(d[0]))
      .y1((d) => scaleY(d[1]));
    this.drawPanel
      .select(drawName)
      .selectAll('g')
      .select('.draw')
      .attr('fill', (d, i) => this.getStackeddrawColor(d, i))
      // @ts-ignore
      .attr('d', drawContent);
  }

  legendMouseover(e: any, data: any, mouseover: boolean): void {
    if (e) {
      this.hoveredKey = mouseover ? data.key : null;
    }
    this.drawPanel
      .select(`.${this.chartType}`)
      .selectAll('g')
      .select('.draw')
      .filter((d: any) => d.key === this.chart.x0!(data)) // key is from stacked data
      .style('fill-opacity', (d) => (mouseover ? 0.9 : 0.5));
  }
}
