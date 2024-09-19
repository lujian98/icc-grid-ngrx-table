import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { isDataSource } from '@angular/cdk/collections';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { debounceTime, delay, takeWhile } from 'rxjs/operators';
import * as d3 from 'd3-selection';
// @ts-ignore
import * as d3Dispatch from 'd3-dispatch';
import * as d3Transition from 'd3-transition';
import { IccD3DataSource } from '../d3-data-source';
import { IccDrawServie } from '../services';
import { IccAbstractDraw, IccScaleDraw, IccAxisDraw, IccZoomDraw, IccView, IccInteractiveDraw } from '../draws';
import { CommonModule } from '@angular/common';
import {
  IccD3Options,
  IccD3ChartConfig,
  IccD3LegendOptions,
  IccD3ZoomOptions,
  DEFAULT_CHART_OPTIONS,
  DEFAULT_CHART_CONFIGS,
  DEFAULT_BULLET_CHART_CONFIGS,
  DEFAULT_VERTICAL_BULLET_CHART_CONFIGS,
  DEFAULT_PIE_CHART_CONFIGS,
  DEFAULT_RADIAL_GAUGE_CONFIGS,
} from '../models';

import { IccD3PopoverComponent2 } from './popover/popover.component';
import { IccD3LegendComponent } from './legend/legend.component';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccTrigger, IccPosition } from '@icc/ui/overlay';
import { IccD3Config } from '../models/d3.model';

@Component({
  selector: 'icc-d3-view',
  templateUrl: './d3-view.component.html',
  styleUrls: ['./d3-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPopoverDirective, IccD3PopoverComponent2, IccD3LegendComponent],
  providers: [IccDrawServie],
})
export class IccD3ViewComponent<T> implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  private _d3Config!: IccD3Config;
  private _chartConfigs: IccD3ChartConfig[] = [];
  private _data!: any[];

  @Input()
  set d3Config(value: IccD3Config) {
    this._d3Config = { ...value };
  }
  get d3Config(): IccD3Config {
    return this._d3Config;
  }

  @Input()
  set chartConfigs(val: IccD3ChartConfig[]) {
    //console.log(' 777777 view chartConfigs=', val);
    this._chartConfigs = [...val];
  }
  get chartConfigs(): IccD3ChartConfig[] {
    return this._chartConfigs;
  }

  @Input()
  set data(val: T[]) {
    this._data = [...val];
  }
  get data(): T[] {
    return this._data;
  }

  @Input() options!: IccD3Options; // TODO use as input in the future
  @Input() dataSource!: IccD3DataSource<T[]> | Observable<T[]> | T[];
  //@Input() data!: T[];

  trigger = IccTrigger.NOOP;
  positopn = IccPosition.BOTTOMRIGHT;

  dispatch!: d3Dispatch.Dispatch<{}>;
  view = new IccView(this.elementRef, DEFAULT_CHART_OPTIONS);
  scale: IccScaleDraw<T> = new IccScaleDraw(this.view);
  scale$ = new Subject<IccScaleDraw<T>>();
  draws: IccAbstractDraw<T>[] = [];
  zoom!: IccZoomDraw<T>;
  interactive!: IccInteractiveDraw<T>;
  drawAxis!: IccAxisDraw<T>;
  private _dataSubscription!: Subscription | null;
  private alive = true;
  private isViewReady = false;
  isWindowReszie$: Subject<{}> = new Subject();
  @ViewChild(IccPopoverDirective) popover!: IccPopoverDirective;
  d3Popover = IccD3PopoverComponent2;

  @HostBinding('style.flex-direction') get flexDirection(): any {
    if (this.legend) {
      switch (this.legend.position) {
        case 'top':
          return 'column-reverse';
        case 'bottom':
          return 'column';
        case 'right':
          return '';
      }
    }
  }

  // @ts-ignore
  get chartConfig(): IccD3ChartConfig {
    if (this.chartConfigs && this.chartConfigs[0]) {
      return this.chartConfigs[0];
    }
  }
  // @ts-ignore
  get legend(): IccD3LegendOptions {
    if (this.chartConfigs && this.chartConfigs[0] && this.chartConfigs[0].legend) {
      return this.chartConfigs[0].legend;
    }
  }

  // @ts-ignore
  get zoomConfig(): IccD3ZoomOptions {
    if (this.chartConfigs && this.chartConfigs[0] && this.chartConfigs[0].zoom) {
      return this.chartConfigs[0].zoom;
    }
  }

  constructor(
    protected elementRef: ElementRef,
    private drawServie: IccDrawServie<T>,
  ) {
    this.setDispatch();
  }

  ngOnInit(): void {
    this.isWindowReszie$
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(100),
      )
      .subscribe(() => this.resizeChart(this.data));
    this.scale.scaleChange$
      .pipe(
        takeWhile(() => this.alive),
        delay(0),
      )
      .subscribe((scale) => this.scale$.next(scale));
  }

  ngAfterViewInit(): void {
    this.isViewReady = true;
    if (this.data) {
      this.updateChart(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if (changes.chartConfigs || changes.options) {
      this.view.initOptions(this.options, this.chartConfig);
      this.setChartConfigs();

      this._clearDataSource(true);
      // @ts-ignore
      if (changes.chartConfigs && !changes.chartConfigs.firstChange && this.data) {
        this._setDataSource(this.data);
      }
    }
    // @ts-ignore
    if (changes.dataSource) {
      this._setDataSource(this.dataSource);
      // @ts-ignore
    } else if (changes.data) {
      this._setDataSource(this.data);
    }
  }

  // TODO this is temporary set chart group from options
  private setChartConfigs(): void {
    if (this.chartConfigs.length === 0) {
      this.chartConfigs.push({});
    }
    this.chartConfigs = [...this.chartConfigs].map((item, index) => {
      let chart = { ...item };
      if (chart.panelId === undefined) {
        chart.panelId = '0';
      }
      if (chart.yAxisId === undefined) {
        chart.yAxisId = 'LEFT';
      }
      if (chart.xAxisId === undefined) {
        chart.xAxisId = 'BOTTOM';
      }
      if (index > 0) {
        chart = this.getOptions(chart, this.chartConfigs[0]);
      }

      let configs = DEFAULT_CHART_CONFIGS;

      if (chart.chartType === 'bulletChart') {
        const bulletType = chart.bullet && chart.bullet.type ? chart.bullet.type : 'horizontal';
        const dOptions =
          bulletType === 'vertical' ? DEFAULT_VERTICAL_BULLET_CHART_CONFIGS : DEFAULT_BULLET_CHART_CONFIGS;
        configs = this.getOptions(dOptions, configs);
      } else if (chart.chartType === 'pieChart') {
        configs = this.getOptions(DEFAULT_PIE_CHART_CONFIGS, configs);
      } else if (chart.chartType === 'radialGauge') {
        configs = this.getOptions(DEFAULT_RADIAL_GAUGE_CONFIGS, configs);
      }

      /* // TODO zoom optons
        private setZoomOptions(): void {
    // const zoom = this.options.zoom;
    zoom.horizontalOff = !zoom.enabled ? true : zoom.horizontalOff;
    zoom.horizontalBrushShow = !zoom.enabled || zoom.horizontalOff ? false : zoom.horizontalBrushShow;
    zoom.verticalOff = !zoom.enabled ? true : zoom.verticalOff;
    zoom.verticalBrushShow = !zoom.enabled || zoom.verticalOff ? false : zoom.verticalBrushShow;
  }
  */
      return this.getOptions(chart, configs); // TODO options is default chart config
    });
    //console.log(' nnnnnnnn this.chartConfigs=', this.chartConfigs);
  }

  private getOptions(option1: IccD3ChartConfig, option2: IccD3ChartConfig): IccD3ChartConfig {
    for (const [key, value] of Object.entries(option1)) {
      // @ts-ignore
      if (typeof value === 'object' && value !== null && option2[key]) {
        // @ts-ignore
        option1[key] = { ...option2[key], ...option1[key] };
      }
    }
    return { ...option2, ...option1 };
  }

  public updateChart(data: T[]): void {
    this.data = this.checkData(data);
    if (this.isViewReady && this.data) {
      if (!this.view.svg) {
        this.createChart(this.data);
      } else {
        this.setDrawDomain(this.data);
        this.drawChart(this.data);
        if (this.zoomConfig.enabled) {
          this.zoom.setZoomRange();
        }
        this.interactive.update();
      }
    }
  }

  public resizeChart(data: T[]): void {
    this.view.setViewDimension(this.zoomConfig);
    this.scale.update();
    this.setDrawDomain(data);
    if (this.zoomConfig.enabled) {
      this.zoom.update();
      this.zoom.setZoomRange();
    }
    this.drawChart(data);
    this.interactive.update();
  }

  public createChart(data: T[]): void {
    this.view.setViewDimension(this.zoomConfig);
    this.scale.initColor(data);
    this.view.initView(this.chartConfigs);
    this.view.update();
    this.scale.buildScales(this.chartConfigs);
    this.drawAxis = new IccAxisDraw(this.view, this.scale, this.chartConfigs);
    this.chartConfigs.forEach((chart) => {
      const draw = this.drawServie.getDraw(this.view, this.scale, this.dispatch, chart);
      this.draws.push(draw);
    });
    this.setDrawDomain(data);
    this.drawChart(data);
    if (this.zoomConfig.enabled) {
      this.zoom = new IccZoomDraw(this.view, this.scale, this);
    }
    this.interactive = new IccInteractiveDraw(this.view, this.scale, this);
    this.interactive.drawPanel.select('.drawArea').on('mouseout', (e, d) => {
      // console.log(' mouseout=', e)
      this.popover.hide();
    });
  }

  drawChart(data: any[]): void {
    this.draws.forEach((draw: IccAbstractDraw<T>, i: number) => {
      const drawData = data.filter((d: any) => {
        const panelId = d.panelId ? d.panelId : '0';
        const yAxisId = d.yAxisId ? d.yAxisId : 'LEFT';
        // console.log( ' panelId=', panelId, '=draw.chartType=', draw.chartType)
        // console.log( ' draw.panelId=', draw.panelId, '=draw.chartType=', draw.chartType)
        return (
          !d.disabled &&
          draw.panelId === panelId &&
          draw.yAxisId === yAxisId &&
          (d.chartType === draw.chartType || (!d.chartType && this.draws[0].chartType === draw.chartType))
        );
      });
      draw.drawChart(drawData);
    });
  }

  stateChangeDraw(): void {
    this.setDrawDomain(this.data); // TODO option to turn on/off set dromain
    if (this.zoomConfig.enabled) {
      this.zoom.setZoomRange();
    }
    this.drawChart(this.data);
    this.interactive.update();
  }

  setDrawDomain(data: T[]): void {
    this.scale.setDrawDomain(data);
    this.drawAxis.update();
  }

  setDispatch(): void {
    this.dispatch = d3Dispatch.dispatch(
      'drawMouseover',
      'drawMouseout',
      'drawZoom',
      'legendClick',
      'legendResize',
      'legendMouseover',
      'legendMouseout',
      'stateChange',
    );
    this.dispatch.on('legendClick', (d: any) => {
      this.legendMouseover(d, !d.disabled);
      this.stateChangeDraw();
      this.legendMouseover(d, !d.disabled);
    });
    this.dispatch.on('legendResize', (d: any) => this.resizeChart(this.data));
    this.dispatch.on('legendMouseover', (d: any) => this.legendMouseover(d, true));
    this.dispatch.on('legendMouseout', (d: any) => this.legendMouseover(d, false));
    this.dispatch.on('drawMouseover', (p: any) => {
      this.popover.hide();
      if (p.data && p.data.series.length > 0) {
        this.popover.context = { data: p.data };
        this.popover.openPopover(p.event);
      }
    });
    this.dispatch.on('drawMouseout', (p: any) => {
      this.popover.hide(); // NOT WORKING
    });
  }

  legendMouseover(data: T[], mouseover: boolean): void {
    this.draws.forEach((draw: IccAbstractDraw<T>) => draw.legendMouseover(null, data, mouseover));
  }

  redraw = () => this.draws.forEach((draw: IccAbstractDraw<T>) => draw.redraw());

  private _setDataSource(dataSource: IccD3DataSource<T[]> | Observable<T[]> | T[]): void {
    this._clearDataSource();
    let dataStream: Observable<T[] | ReadonlyArray<T[]>> | undefined;
    if (isDataSource(dataSource)) {
      dataStream = dataSource.connect();
    } else if (dataSource instanceof Observable) {
      dataStream = dataSource;
    } else if (Array.isArray(dataSource)) {
      dataStream = of(dataSource);
    }
    if (dataStream) {
      // @ts-ignore
      this._dataSubscription = dataStream.pipe(takeWhile(() => this.alive)).subscribe((data: T[]) => {
        if (data) {
          this.data = data;
          this.updateChart(this.data);
        }
      });
    }
  }

  private _clearDataSource(clearElemet: boolean = false): void {
    if (this.dataSource && typeof (this.dataSource as IccD3DataSource<T[]>).disconnect === 'function') {
      (this.dataSource as IccD3DataSource<T[]>).disconnect();
      clearElemet = true;
    }
    if (clearElemet) {
      this.view.clearElement();
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.isWindowReszie$.complete();
    this._clearDataSource();
    this.view.clearElement();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.isWindowReszie$.next(true);
  }

  private cloneData = <T>(data: T[]) => data && data.map((d) => (typeof d === 'object' ? Object.assign({}, d) : d));

  private checkData<T>(data: T[]): any[] {
    const configs = this.chartConfigs[0];
    data = this.cloneData(data);
    return data && configs.chartType === 'pieChart' && !configs.y0!(data[0])
      ? [
          {
            key: 'Pie Chart',
            values: data,
          },
        ]
      : data;
  }
}
