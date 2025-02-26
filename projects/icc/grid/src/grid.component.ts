import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { uniqueId, IccButtonConfg, IccBUTTONS, IccButtonType, IccTasksService } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccColumnConfig, IccGridConfig, IccGridData, IccGridSetting } from './models/grid-column.model';
import { defaultGridConfig } from './models/default-grid';
import { IccGridViewComponent } from './components/grid-view.component';
import { IccGridFooterComponent } from './components/grid-footer/grid-footer.component';
import { IccGridStateModule } from './+state/grid-state.module';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';

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
  ],
})
export class IccGridComponent<T> implements OnInit, OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private tasksService = inject(IccTasksService);
  private _gridConfig!: IccGridConfig;
  private _columnsConfig: IccColumnConfig[] = [];
  private _gridData!: IccGridData<T>;
  private gridId = uniqueId(16);
  gridConfig$!: Observable<IccGridConfig>;
  gridSetting$!: Observable<IccGridSetting>;
  columnsConfig$!: Observable<IccColumnConfig[]>;

  buttons: IccButtonConfg[] = [
    IccBUTTONS.Edit,
    IccBUTTONS.Save,
    IccBUTTONS.Reset,
    IccBUTTONS.View,
    IccBUTTONS.Refresh,
    IccBUTTONS.ClearAllFilters,
  ];

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
      //gridId: this.gridId,
    };
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridId);
    this.gridSetting$ = this.gridFacade.selectSetting(this.gridId);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridId);
    this.gridFacade.initGridConfig(this.gridId, this.gridConfig);
  }

  @Input()
  set columnsConfig(val: IccColumnConfig[]) {
    this._columnsConfig = val;
    if (!this.gridConfig) {
      this.initGridConfig({ ...defaultGridConfig });
    }
    if (!this.gridConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
      this.gridFacade.setGridColumnsConfig(this.gridId, this.gridConfig, this.columnsConfig);
    }
  }
  get columnsConfig(): IccColumnConfig[] {
    return this._columnsConfig;
  }

  @Input()
  set gridData(val: IccGridData<T>) {
    this._gridData = { ...val };
    if (!this.gridConfig.remoteGridData && this.gridData) {
      this.gridFacade.setGridInMemoryData(this.gridId, this.gridConfig, this.gridData as IccGridData<object>);
    }
  }
  get gridData(): IccGridData<T> {
    return this._gridData;
  }

  ngOnInit(): void {
    this.tasksService.loadTaskService(this.gridId, IccGridFacade, this.gridConfig);
  }

  getButtons(gridSetting: IccGridSetting): IccButtonConfg[] {
    return [...this.buttons].map((button) => {
      const hidden = this.getHidden(button, gridSetting);
      const disabled = this.getDisabled(button, gridSetting);
      return {
        ...button,
        hidden,
        disabled,
      };
    });
  }

  private getDisabled(button: IccButtonConfg, gridSetting: IccGridSetting): boolean {
    switch (button.name) {
      case IccButtonType.Save:
      case IccButtonType.Reset:
        return !gridSetting.recordModified;
      default:
        return false;
    }
  }

  private getHidden(button: IccButtonConfg, gridSetting: IccGridSetting): boolean {
    switch (button.name) {
      case IccButtonType.Edit:
      case IccButtonType.Refresh:
      case IccButtonType.ClearAllFilters:
        return gridSetting.gridEditable;

      case IccButtonType.Save:
      case IccButtonType.Reset:
      case IccButtonType.View:
        return !gridSetting.gridEditable;
      default:
        return false;
    }
  }

  buttonClick(button: IccButtonConfg, gridConfig: IccGridConfig): void {
    switch (button.name) {
      case IccButtonType.Refresh: // in-memory api not able to refresh since the data are same
        if (gridConfig.virtualScroll) {
          this.gridFacade.getGridPageData(this.gridId, gridConfig, 1);
        } else {
          this.gridFacade.getGridData(this.gridId, gridConfig);
        }
        break;
      case IccButtonType.ClearAllFilters:
        this.gridFacade.setGridColumnFilters(this.gridId, this.gridConfig, []);
        break;
      case IccButtonType.Edit:
        this.gridFacade.setGridEditable(this.gridId, true);
        break;
      case IccButtonType.View:
        this.gridFacade.setGridEditable(this.gridId, false);
        break;
      case IccButtonType.Reset:
        this.gridFacade.setGridRestEdit(this.gridId, true);
        break;
      case IccButtonType.Save:
        this.gridFacade.saveGridModifiedRecords(this.gridId);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.gridId);
    this.tasksService.removeTask(this.gridId);
  }
}
