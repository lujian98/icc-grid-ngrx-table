import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { uniqueId, IccButtonConfg, IccBUTTONS } from '@icc/ui/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridData,
  defaultGridConfig,
  IccGridStateModule,
  IccGridFacade,
} from '@icc/ui/grid';
import { IccTreeViewComponent } from './components/tree-view.component';

@Component({
  selector: 'icc-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, IccIconModule, IccGridStateModule, IccTreeViewComponent, IccButtonComponent],
})
export class IccTreeComponent<T> implements OnDestroy {
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
      this.gridFacade.setGridInMemoryData(this.gridId, this.gridData);
    }
  }
  get gridData(): IccGridData<T> {
    return this._gridData;
  }

  refresh(): void {
    if (this.gridConfig.virtualScroll) {
      this.gridFacade.getGridPageData(this.gridId, 1);
    } else {
      this.gridFacade.getGridData(this.gridId);
    }
  }

  clearFilters(): void {
    this.gridFacade.setGridColumnFilters(this.gridId, []);
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.gridId);
  }
}
