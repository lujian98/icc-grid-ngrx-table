import { ChangeDetectionStrategy, Component, Input, input, OnDestroy, inject } from '@angular/core';
import { IccD3StateModule } from './+state/d3-state.module';
import { IccD3Facade } from './+state/d3.facade';
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
  imports: [IccD3StateModule, IccD3ViewComponent],
})
export class IccD3Component<T> implements OnDestroy {
  private d3Facade = inject(IccD3Facade);
  private _d3Config!: IccD3Config;
  private d3Id = `d3-${crypto.randomUUID()}`;
  d3Config$ = this.d3Facade.getD3Config(this.d3Id);
  d3Setting$ = this.d3Facade.getSetting(this.d3Id);
  chartConfigs$ = this.d3Facade.getD3ChartConfigs(this.d3Id);
  data$ = this.d3Facade.getD3Data(this.d3Id);

  /*
  d3Config = input(defaultD3Config, {
    transform: (value: Partial<IccD3Config>) => {
      const config = { ...defaultD3Config, ...value };
      this.initChartConfigs(config);
      return config;
    },
  });
*/

  @Input()
  set d3Config(value: Partial<IccD3Config>) {
    const d3Config = { ...defaultD3Config, ...value };
    //this._d3Config = { ...d3Config };
    this.initChartConfigs(d3Config);
  }
  get d3Config(): IccD3Config {
    return this._d3Config;
  }

  private initChartConfigs(d3Config: IccD3Config): void {
    this._d3Config = { ...d3Config };
    this.d3Facade.initD3Config(this.d3Id, d3Config);
  }

  chartConfigs = input([], {
    transform: (chartConfigs: IccD3ChartConfig[]) => {
      if (!this.d3Config) {
        this.initChartConfigs({ ...defaultD3Config });
      }
      if (!this.d3Config.remoteChartConfigs && chartConfigs.length > 0) {
        this.d3Facade.setD3ChartConfigs(this.d3Id, this.d3Config, [...chartConfigs]);
      }
      return chartConfigs;
    },
  });
  data = input([], {
    transform: (data: T[]) => {
      if (!this.d3Config.remoteD3Data && data) {
        this.d3Facade.setD3Data(this.d3Id, this.d3Config, data);
      }
      return data;
    },
  });

  ngOnDestroy(): void {
    this.d3Facade.clearD3DataStore(this.d3Id);
  }
}
