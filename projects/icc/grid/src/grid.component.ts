import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { uniqueId, IccButtonConfg, IccBUTTONS, IccButtonType } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccColumnConfig, IccGridConfig, IccGridData } from './models/grid-column.model';
import { defaultGridConfig } from './models/default-grid';
import { IccGridViewComponent } from './components/grid-view.component';
import { IccGridFooterComponent } from './components/grid-footer/grid-footer.component';
import { IccGridStateModule } from './+state/grid-state.module';
import { IccLayoutComponent, IccLayoutHeaderComponent, IccLayoutFooterComponent } from '@icc/ui/layout';

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IccIconModule,
    IccGridStateModule,
    IccGridViewComponent,
    IccGridFooterComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
  ],
})
export class IccGridComponent<T> implements OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columnsConfig: IccColumnConfig[] = [];
  private _gridData!: IccGridData<T>;
  private gridId = uniqueId(16);
  gridConfig$!: Observable<IccGridConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;

  buttons: IccButtonConfg[] = [IccBUTTONS.Refresh, IccBUTTONS.ClearAllFilters];

  @Input()
  set gridConfig(value: Partial<IccGridConfig>) {
    this.initGridConfig({ ...defaultGridConfig, ...value });
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  private initGridConfig(value: IccGridConfig): void {
    this._gridConfig = {
      ...value,
      gridId: this.gridId,
    };
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridId);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridId);
    this.gridFacade.initGridConfig(this.gridConfig);
  }

  @Input()
  set columnsConfig(val: IccColumnConfig[]) {
    this._columnsConfig = val;
    if (!this.gridConfig) {
      this.initGridConfig({ ...defaultGridConfig });
    }
    if (!this.gridConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
      this.gridFacade.setGridColumnsConfig(this.gridConfig, this.columnsConfig);
    }
  }
  get columnsConfig(): IccColumnConfig[] {
    return this._columnsConfig;
  }

  @Input()
  set gridData(val: IccGridData<T>) {
    this._gridData = { ...val };
    if (!this.gridConfig.remoteGridData && this.gridData) {
      this.gridFacade.setGridInMemoryData(this.gridConfig, this.gridData as IccGridData<object>);
    }
  }
  get gridData(): IccGridData<T> {
    return this._gridData;
  }

  buttonClick(button: IccButtonConfg, gridConfig: IccGridConfig): void {
    switch (button.name) {
      case IccButtonType.Refresh:
        if (gridConfig.virtualScroll) {
          this.gridFacade.getGridPageData(gridConfig, 1);
        } else {
          this.gridFacade.getGridData(gridConfig);
        }
        break;
      case IccButtonType.ClearAllFilters:
        this.gridFacade.setGridColumnFilters(this.gridConfig, []);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.gridId);
  }
}
