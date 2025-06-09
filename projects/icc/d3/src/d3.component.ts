import { ChangeDetectionStrategy, Component, OnDestroy, inject, input } from '@angular/core';
import { IccD3StateModule } from './+state/d3-state.module';
import { IccD3Facade } from './+state/d3.facade';
import { IccD3ViewComponent } from './components/d3-view.component';
import { IccD3ChartConfig } from './models';
import { IccD3Config, defaultD3Config } from './models/d3.model';

@Component({
  selector: 'icc-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccD3StateModule, IccD3ViewComponent],
})
export class IccD3Component<T> implements OnDestroy {
  private readonly d3Facade = inject(IccD3Facade);
  private d3Id = `d3-${crypto.randomUUID()}`;
  d3Config$ = this.d3Facade.getD3Config(this.d3Id);
  d3Setting$ = this.d3Facade.getSetting(this.d3Id);
  chartConfigs$ = this.d3Facade.getD3ChartConfigs(this.d3Id);
  data$ = this.d3Facade.getD3Data(this.d3Id);

  d3Config = input(defaultD3Config, {
    transform: (value: Partial<IccD3Config>) => {
      const config = { ...defaultD3Config, ...value };
      this.initChartConfigs(config);
      return config;
    },
  });

  chartConfigs = input([], {
    transform: (chartConfigs: IccD3ChartConfig[]) => {
      if (!this.d3Config().remoteChartConfigs && chartConfigs.length > 0) {
        this.d3Facade.setD3ChartConfigs(this.d3Id, this.d3Config(), [...chartConfigs]);
      }
      return chartConfigs;
    },
  });
  data = input([], {
    transform: (data: T[]) => {
      if (!this.d3Config().remoteD3Data && data) {
        this.d3Facade.setD3Data(this.d3Id, this.d3Config(), data);
      }
      return data;
    },
  });

  constructor() {
    this.initChartConfigs(defaultD3Config);
  }

  private initChartConfigs(d3Config: IccD3Config): void {
    this.d3Facade.initD3Config(this.d3Id, d3Config);
  }

  ngOnDestroy(): void {
    this.d3Facade.clearD3DataStore(this.d3Id);
  }
}
