import { isDataSource } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';
// @ts-ignore
import * as d3Dispatch from 'd3-dispatch';
import { IccD3DataSource } from '../d3-data-source';
import { IccAbstractDraw, IccAxisDraw, IccInteractiveDraw, IccScaleDraw, IccView, IccZoomDraw } from '../draws';
import {
  DEFAULT_BULLET_CHART_CONFIGS,
  DEFAULT_CHART_CONFIGS,
  DEFAULT_CHART_OPTIONS,
  DEFAULT_PIE_CHART_CONFIGS,
  DEFAULT_RADIAL_GAUGE_CONFIGS,
  DEFAULT_VERTICAL_BULLET_CHART_CONFIGS,
  IccD3ChartConfig,
  IccD3LegendOptions,
  IccD3Options,
  IccD3ZoomOptions,
} from '../models';
import { IccDrawServie } from '../services';

import { DEFAULT_OVERLAY_SERVICE_CONFIG, IccOverlayServiceConfig, IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverService } from '@icc/ui/popover';
import { IccD3Config } from '../models/d3.model';
import { IccD3LegendComponent } from './legend/legend.component';
import { IccD3PopoverComponent2 } from './popover/popover.component';

@Component({
  selector: 'icc-d3-view',
  templateUrl: './d3-view.component.html',
  styleUrls: ['./d3-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccD3LegendComponent],
  providers: [IccDrawServie, IccPopoverService],
})
export class IccD3ViewComponent<T> implements AfterViewInit, OnInit, OnDestroy {
  private popoverService = inject(IccPopoverService);
  private options!: IccD3Options; // get form d3Config
  dispatch!: d3Dispatch.Dispatch<{}>;
  view = new IccView(this.elementRef, DEFAULT_CHART_OPTIONS);
  scale: IccScaleDraw<T> = new IccScaleDraw(this.view);
  draws: IccAbstractDraw<T>[] = [];
  zoom!: IccZoomDraw<T>;
  interactive!: IccInteractiveDraw<T>;
  drawAxis!: IccAxisDraw<T>;
  private _dataSubscription!: Subscription | null;
  private alive = true;
  private isViewReady = false;
  isWindowReszie$: Subject<{}> = new Subject();

  data$ = signal<T[]>([]);
  chartConfigs$ = signal<IccD3ChartConfig[]>([]);
  chartConfigs = input.required({
    transform: (chartConfigs: IccD3ChartConfig[]) => {
      const chartConfig = chartConfigs[0];
      this.view.initOptions(this.options, chartConfig);
      this.setChartConfigs(chartConfigs);
      this._clearDataSource(true);
      this._setDataSource(this.data$());
      return chartConfigs;
    },
  });
  d3Config = input.required({
    transform: (d3Config: IccD3Config) => {
      if (d3Config.options) {
        this.options = { ...d3Config.options };
      }
      return d3Config;
    },
  });
  data = input([], {
    transform: (data: T[]) => {
      this.data$.set(data);
      this._setDataSource(data);
      return data;
    },
  });
  dataSource = input([], {
    transform: (dataSource: IccD3DataSource<T[]> | Observable<T[]> | T[]) => {
      this._setDataSource(dataSource);
      return dataSource;
    },
  });

  get legend(): IccD3LegendOptions {
    return this.chartConfigs$()[0].legend!;
  }

  get zoomConfig(): IccD3ZoomOptions {
    return this.chartConfigs$()[0].zoom!;
  }

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
      .subscribe(() => this.resizeChart(this.data$()));
  }

  ngAfterViewInit(): void {
    this.isViewReady = true;
    if (this.data$()) {
      this.updateChart(this.data$());
    }
  }

  // TODO this is temporary set chart group from options
  private setChartConfigs(chartConfigs: IccD3ChartConfig[]): void {
    const newconfigs = chartConfigs.map((item, index) => {
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
        chart = this.getOptions(chart, chartConfigs[0]);
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
      return this.getOptions(chart, configs); // TODO options is default chart config
    });
    this.chartConfigs$.set(newconfigs);
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
    this.data$.set(this.checkData(data));
    if (this.isViewReady && this.data$()) {
      if (!this.view.svg) {
        this.createChart(this.data$());
      } else {
        this.setDrawDomain(this.data$());
        this.drawChart(this.data$());
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
    this.view.initView(this.chartConfigs$());
    this.view.update();
    this.scale.buildScales(this.chartConfigs$());
    this.drawAxis = new IccAxisDraw(this.view, this.scale, this.chartConfigs$());
    this.chartConfigs$().forEach((chart) => {
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
      this.hidePopover();
    });
  }

  drawChart(data: any[]): void {
    this.draws.forEach((draw: IccAbstractDraw<T>, i: number) => {
      const drawData = data.filter((d: any) => {
        const panelId = d.panelId ? d.panelId : '0';
        const yAxisId = d.yAxisId ? d.yAxisId : 'LEFT';
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
    this.setDrawDomain(this.data$()); // TODO option to turn on/off set dromain
    if (this.zoomConfig.enabled) {
      this.zoom.setZoomRange();
    }
    this.drawChart(this.data$());
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
    this.dispatch.on('legendResize', (d: any) => this.resizeChart(this.data$()));
    this.dispatch.on('legendMouseover', (d: any) => this.legendMouseover(d, true));
    this.dispatch.on('legendMouseout', (d: any) => this.legendMouseover(d, false));
    this.dispatch.on('drawMouseover', (p: any) => {
      this.hidePopover();
      if (p.data && p.data.series.length > 0) {
        const popoverContext = { data: p.data };
        this.buildPopover(popoverContext, p.event);
      }
    });
    this.dispatch.on('drawMouseout', (p: any) => {
      this.hidePopover(); // NOT WORKING
    });
  }

  private buildPopover(popoverContext: Object, event: MouseEvent): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.POINT,
      position: IccPosition.BOTTOMRIGHT,
      event,
    };
    this.popoverService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      IccD3PopoverComponent2,
      popoverContext,
    );
    this.showPopover();
  }

  private showPopover(): void {
    this.hidePopover();
    this.popoverService.show();
  }

  private hidePopover() {
    this.popoverService.hide();
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
          this.data$.set(data);
          this.updateChart(this.data$());
        }
      });
    }
  }

  private _clearDataSource(clearElemet: boolean = false): void {
    if (this.dataSource() && typeof (this.dataSource() as IccD3DataSource<T[]>).disconnect === 'function') {
      (this.dataSource() as IccD3DataSource<T[]>).disconnect();
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
    const configs = this.chartConfigs$()[0];
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
