import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IccD3StateModule } from './+state/d3-state.module';
import { IccD3Facade } from './+state/d3.facade';
import { uniqueId } from '@icc/ui/core';
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
} from './models';
import { IccD3ViewComponent } from './components/d3-view.component';
import { IccD3Config, defaultD3Config, IccD3Setting } from './models/d3.model';

@Component({
  selector: 'icc-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccD3StateModule, IccD3ViewComponent],
})
export class IccD3Component<T> implements OnDestroy {
  private d3Facade = inject(IccD3Facade);
  private _d3Config!: IccD3Config;
  private _chartConfigs: IccD3ChartConfig[] = [];
  private _data!: any[];
  private d3Id = uniqueId(16);
  d3Setting$!: Observable<IccD3Setting>;
  d3Config$!: Observable<IccD3Config>;
  chartConfigs$!: Observable<IccD3ChartConfig[] | undefined>;
  data$!: Observable<T[]>;

  @Input()
  set d3Config(value: Partial<IccD3Config>) {
    this.initChartConfigs({ ...defaultD3Config, ...value });
  }
  get d3Config(): IccD3Config {
    return this._d3Config;
  }

  private initChartConfigs(value: IccD3Config): void {
    this._d3Config = { ...value };
    this.d3Config$ = this.d3Facade.selectD3Config(this.d3Id);
    this.d3Setting$ = this.d3Facade.selectSetting(this.d3Id);
    this.chartConfigs$ = this.d3Facade.selectD3ChartConfigs(this.d3Id);
    this.data$ = this.d3Facade.selectD3Data(this.d3Id);
    this.d3Facade.initD3Config(this.d3Id, this.d3Config);
  }

  @Input()
  set chartConfigs(val: IccD3ChartConfig[]) {
    this._chartConfigs = val;
    if (!this.d3Config) {
      this.initChartConfigs({ ...defaultD3Config });
    }
    if (!this.d3Config.remoteChartConfigs && this.chartConfigs.length > 0) {
      this.d3Facade.setD3ChartConfigs(this.d3Id, this.d3Config, [...this.chartConfigs]);
    }
  }
  get chartConfigs(): IccD3ChartConfig[] {
    return this._chartConfigs;
  }

  @Input()
  set data(val: T[]) {
    this._data = val;
    if (!this.d3Config.remoteD3Data && this.data) {
      this.d3Facade.setD3Data(this.d3Id, this.d3Config, this.data);
    }
  }
  get data(): T[] {
    return this._data;
  }

  ngOnDestroy(): void {
    this.d3Facade.clearD3DataStore(this.d3Id);
  }
}
