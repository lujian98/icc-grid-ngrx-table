import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccGridData } from './models/grid-column.model';
import { defaultGridConfig } from './models/default-grid';
import { IccGridViewComponent } from './components/grid-view.component';
import { IccGridFooterComponent } from './components/grid-footer/grid-footer.component';
import { IccGridStateModule } from './+state/grid-state.module';

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridStateModule, IccGridViewComponent, IccGridFooterComponent],
})
export class IccGridComponent<T> implements OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig: IccGridConfig = defaultGridConfig;
  private _columnsConfig: IccColumnConfig[] = [];
  private _gridData!: IccGridData<T>;
  gridConfig$!: Observable<IccGridConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridConfig.gridName);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridConfig.gridName);
    this.gridFacade.setupGridConfig(value);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set columnsConfig(val: IccColumnConfig[]) {
    this._columnsConfig = val;
    if (!this.gridConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
      this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, this.columnsConfig);
    }
  }
  get columnsConfig(): IccColumnConfig[] {
    return this._columnsConfig;
  }

  @Input()
  set gridData(val: IccGridData<T>) {
    this._gridData = val;
    if (!this.gridConfig.remoteGridData && this.gridData) {
      this.gridFacade.setGridInMemoryData(this.gridConfig.gridName, this.gridData);
    }
  }
  get gridData(): IccGridData<T> {
    return this._gridData;
  }

  refresh(): void {
    if (this.gridConfig.virtualScroll) {
      this.gridFacade.getGridPageData(this.gridConfig.gridName, 1);
    } else {
      this.gridFacade.getGridData(this.gridConfig.gridName);
    }
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.gridConfig.gridName);
  }
}
