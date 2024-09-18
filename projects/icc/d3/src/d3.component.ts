import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'icc-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccD3ViewComponent],
})
export class IccD3Component<T> implements OnDestroy {
  //private gridFacade = inject(IccGridFacade);
  private _d3Config: any; // IccGridConfig = defaultD3Config;
  private _chartConfigs: IccD3ChartConfig[] = [];
  private d3Id = uniqueId(16);
  /*
  private _gridData!: IccGridData<T>;
  private gridId = uniqueId(16);
  gridConfig$!: Observable<IccGridConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;
  */

  @Input()
  set d3Config(value: any) {
    //console.log('0000000000gridId', this.gridId);
    this._d3Config = {
      ...value,
      d3Id: this.d3Id,
    };

    //this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridId);
    //this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridId);
    //this.gridFacade.initGridConfig(this.gridConfig);
  }
  get d3Config(): IccD3ChartConfig {
    return this._d3Config;
  }

  @Input()
  set chartConfigs(val: IccD3ChartConfig[]) {
    this._chartConfigs = val;
    //if (!this.gridConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
    //  this.gridFacade.setGridColumnsConfig(this.gridConfig, this.columnsConfig);
    //}
  }
  get chartConfigs(): IccD3ChartConfig[] {
    return this._chartConfigs;
  }

  @Input() data!: T[];
  /*
  @Input()
  set gridData(val: IccGridData<T>) {
    this._gridData = val;
    if (!this.gridConfig.remoteGridData && this.gridData) {
      this.gridFacade.setGridInMemoryData(this.gridId, this.gridData);
    }
  }
  get gridData(): IccGridData<T> {
    return this._gridData;
  }
*/

  ngOnDestroy(): void {
    //this.gridFacade.clearGridDataStore(this.gridId);
  }
}
