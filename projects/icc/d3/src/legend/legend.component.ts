import { Component, ElementRef, HostBinding, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import * as d3 from 'd3-selection';
import * as d3Dispatch from 'd3-dispatch';
import { IccView, IccScaleDraw } from '../draw';
import { IccD3ChartConfig } from '../model';

@Component({
  selector: 'icc-d3-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class IccD3LegendComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() view: IccView;
  @Input() chartConfigs: IccD3ChartConfig[] = [];
  @Input() data: T[];
  @Input() scale: IccScaleDraw<T>;
  @Input() dispatch: d3Dispatch.Dispatch<{}>;
  private alive = true;
  stateChange$ = new Subject<boolean>();
  availableWidth = 0;
  columnWidths = [];
  legendData: T[][];

  @HostBinding('style.display') get display(): string {
    return (this.getData() && this.columnWidths.length === this.getData().length) || this.legend.position === 'right'
      ? 'flex'
      : null;
  }

  @HostBinding('style.align-items') get alignItems(): string {
    return this.legend.position === 'right' ? this.legend.align : null;
  }

  get configs(): IccD3ChartConfig {
    // TODO other charts if need only for X axis for now
    // console.log(' ssssssssssssssssss this.chartConfigs=', this.chartConfigs)
    return this.chartConfigs[0];
  }

  get legend(): any {
    return this.configs.legend;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.stateChange$
      .pipe(
        takeWhile(() => this.alive),
        delay(0),
      )
      .subscribe(() => {
        this.dispatch.call('legendResize', this, this.getData());
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.view && this.availableWidth !== this.view.width - this.view.margin.left) || changes.data) {
      this.availableWidth = this.view.width - this.view.margin.left;
      this.setLegendData();
    }
  }

  getData(): T[] {
    return this.configs.chartType === 'pieChart' ? this.configs.y0(this.data[0]) : this.data;
  }

  setLegendData(): void {
    const data = this.getData();
    if (data) {
      this.legendData = [];
      if (this.legend.position !== 'right') {
        const seriesPerRow = this.getSeriesPerRow();
        let nd = [];
        data.forEach((d, i) => {
          if (i !== 0 && i % seriesPerRow === 0) {
            this.legendData.push(nd);
            nd = [];
          }
          nd.push(d);
        });
        this.legendData.push(nd);
      } else {
        this.legendData.push(data);
      }
      this.stateChange$.next(true);
    }
  }

  getSeriesPerRow(): number {
    let seriesPerRow = 0;
    this.columnWidths = [];
    const legendText = d3.select(this.elementRef.nativeElement).selectAll('.legend');
    const seriesWidths = [];
    legendText.nodes().forEach((d: any, i) => seriesWidths.push(d.getBoundingClientRect().width));
    let legendWidth = 0;
    while (legendWidth < this.availableWidth && seriesPerRow < seriesWidths.length) {
      this.columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
      legendWidth += seriesWidths[seriesPerRow++];
    }
    if (seriesPerRow === 0) {
      seriesPerRow = 1;
    }
    while (legendWidth > this.availableWidth && seriesPerRow > 1) {
      this.columnWidths = [];
      seriesPerRow--;
      for (let k = 0; k < seriesWidths.length; k++) {
        if (seriesWidths[k] > (this.columnWidths[k % seriesPerRow] || 0)) {
          this.columnWidths[k % seriesPerRow] = seriesWidths[k];
        }
      }
      legendWidth = this.columnWidths.reduce((prev, cur, index, array) => prev + cur);
    }
    return seriesPerRow;
  }

  legendWidth(i: number): string {
    if (this.columnWidths.length > 0 && this.columnWidths.length !== this.getData().length) {
      return `${this.columnWidths[i]}px`;
    }
  }

  legendStyles(): {} {
    const right = 10 + this.view.margin.right + (this.configs.zoom.verticalBrushShow ? 80 : 0);
    let marginRight = `${right}px`;
    let marginLeft = `${this.view.margin.left}px`;
    if (this.legend.align === 'right' && this.columnWidths.length === this.getData().length) {
      marginLeft = 'auto';
    } else if (this.legend.position === 'right') {
      marginLeft = 'auto';
    }
    if (this.legend.align !== 'right' || this.legend.position === 'right') {
      marginRight = 'auto';
    }
    return {
      display: this.legend.position !== 'right' ? 'flex' : null,
      'margin-right': marginRight,
      'margin-left': marginLeft,
    };
  }

  legendText(d: T): string {
    return d && this.configs.chartType === 'pieChart' ? this.configs.x(d) : this.configs.x0(d);
  }

  legendColor(d, i): string {
    if (d && this.scale && this.scale.colors) {
      return d.color || this.scale.colors(this.configs.drawColor(d, i));
    }
  }

  iconStyles(d, i): {} {
    const color = this.legendColor(d, i);
    return {
      'background-color': !d.disabled ? color : null,
      'border-color': color,
    };
  }

  itemClick(event, d: any): void {
    d.disabled = !d.disabled;
    this.dispatch.call('legendClick', this, d);
  }

  itemMouseOver(event, d: T): void {
    this.dispatch.call('legendMouseover', this, d);
  }

  itemMouseOut(event, d: T): void {
    this.dispatch.call('legendMouseout', this, d);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
