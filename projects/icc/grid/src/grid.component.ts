import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, IccButtonType, IccTasksService } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccSpinnerDirective } from '@icc/ui/spinner';
import { IccGridStateModule } from './+state/grid-state.module';
import { IccGridFacade } from './+state/grid.facade';
import { IccGridFooterComponent } from './components/grid-footer/grid-footer.component';
import { IccGridViewComponent } from './components/grid-view.component';
import { defaultGridConfig, defaultGridSetting } from './models/default-grid';
import { IccColumnConfig, IccGridConfig, IccGridData, IccGridSetting } from './models/grid-column.model';

export interface IccButtonClick {
  button: IccButtonConfg;
  gridConfig: IccGridConfig;
  gridSetting: IccGridSetting;
}

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IccIconModule,
    IccGridStateModule,
    IccGridViewComponent,
    IccGridFooterComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccSpinnerDirective,
  ],
})
export class IccGridComponent<T> implements OnInit, OnDestroy {
  private readonly gridFacade = inject(IccGridFacade);
  private readonly tasksService = inject(IccTasksService);
  private gridId = `grid-${crypto.randomUUID()}`;
  gridConfig$ = this.gridFacade.getGridConfig(this.gridId);
  gridSetting$ = this.gridFacade.getSetting(this.gridId);
  columnsConfig$ = this.gridFacade.getColumnsConfig(this.gridId);
  buttonList = signal<IccButtonConfg[]>([IccBUTTONS.Refresh, IccBUTTONS.ClearAllFilters]);

  buttons = input<IccButtonConfg[]>([...this.buttonList()]);
  gridConfig = input(defaultGridConfig, {
    transform: (value: Partial<IccGridConfig>) => {
      const config = { ...defaultGridConfig, ...value };
      this.initGridConfig(config);
      return config;
    },
  });
  columnsConfig = input([], {
    transform: (columnsConfig: IccColumnConfig[]) => {
      if (!this.gridConfig) {
        this.initGridConfig({ ...defaultGridConfig });
      }
      if (!this.gridConfig$().remoteColumnsConfig && columnsConfig.length > 0) {
        const gridSetting = { ...defaultGridSetting, gridId: this.gridId };
        this.gridFacade.setGridColumnsConfig(this.gridConfig$(), gridSetting, columnsConfig);
      }
      return columnsConfig;
    },
  });
  gridData = input(undefined, {
    transform: (gridData: IccGridData<T>) => {
      if (!this.gridConfig$().remoteGridData && gridData) {
        //console.log(' xxxxxthis._gridData=', gridData)
        this.gridFacade.setGridInMemoryData(this.gridId, this.gridConfig$(), gridData as IccGridData<object>);
      }
      return gridData;
    },
  });

  @Output() iccButtonClick = new EventEmitter<IccButtonClick>(false);

  constructor() {
    effect(() => {
      if (this.gridSetting$()) {
        this.setButtons();
      }
    });
  }

  ngOnInit(): void {
    this.tasksService.loadTaskService(this.gridId, IccGridFacade, this.gridConfig());
  }

  private initGridConfig(config: IccGridConfig): void {
    this.gridFacade.initGridConfig(this.gridId, config, 'grid');
  }

  private setButtons(): void {
    const buttons = [...this.buttons()].map((button) => {
      const hidden = this.getHidden(button);
      const disabled = this.getDisabled(button);
      return {
        ...button,
        hidden,
        disabled,
      };
    });
    this.buttonList.update(() => buttons);
  }

  private getDisabled(button: IccButtonConfg): boolean {
    switch (button.name) {
      case IccButtonType.Save:
      case IccButtonType.Reset:
        return !this.gridSetting$().recordModified;
      case IccButtonType.Open:
        return !(this.gridConfig().hasDetailView && this.gridSetting$().selected === 1);
      default:
        return false;
    }
  }

  private getHidden(button: IccButtonConfg): boolean {
    switch (button.name) {
      case IccButtonType.Edit:
      case IccButtonType.Open:
      case IccButtonType.Refresh:
      case IccButtonType.ClearAllFilters:
        return this.gridSetting$().gridEditable;
      case IccButtonType.Save:
      case IccButtonType.Reset:
      case IccButtonType.View:
        return !this.gridSetting$().gridEditable;
      default:
        return false;
    }
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Refresh: // in-memory api not able to refresh since the data are same
        if (this.gridConfig$().virtualScroll) {
          this.gridFacade.getGridPageData(this.gridId, 1);
        } else {
          this.gridFacade.getGridData(this.gridId, this.gridSetting$());
        }
        break;
      case IccButtonType.ClearAllFilters:
        this.gridFacade.setGridColumnFilters(this.gridConfig$(), this.gridSetting$(), []);
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
      case IccButtonType.Open:
        this.gridFacade.openButtonClick(this.gridId);
        break;
      default:
        break;
    }
    this.iccButtonClick.emit({ button, gridConfig: this.gridConfig$(), gridSetting: this.gridSetting$() });
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.gridId);
    this.tasksService.removeTask(this.gridId);
  }
}
