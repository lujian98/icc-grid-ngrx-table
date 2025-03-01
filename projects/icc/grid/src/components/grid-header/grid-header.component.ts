import { SelectionModel } from '@angular/cdk/collections';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { DEFAULT_OVERLAY_SERVICE_CONFIG, IccOverlayServiceConfig, IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverService } from '@icc/ui/popover';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnResizeTriggerDirective } from '../../directives/column-resize-trigger.directive';
import { IccColumnResizeDirective } from '../../directives/column-resize.directive';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import {
  ColumnMenuClick,
  IccColumnConfig,
  IccColumnWidth,
  IccGridConfig,
  IccGridSetting,
} from '../../models/grid-column.model';
import { IccColumnFilterComponent } from '../column-filter/column-filter.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccGridColumnMenuComponent } from './grid-column-menu/grid-column-menu.component';
import { IccGridHeaderCellComponent } from './grid-header-cell/grid-header-cell.component';
import { IccGridHeaderItemComponent } from './grid-header-item/grid-header-item.component';

@Component({
  selector: 'icc-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    IccGridHeaderCellComponent,
    IccGridHeaderItemComponent,
    IccColumnResizeDirective,
    IccColumnResizeTriggerDirective,
    IccColumnFilterComponent,
    IccRowSelectComponent,
  ],
  providers: [IccPopoverService],
})
export class IccGridHeaderComponent<T> {
  private gridFacade = inject(IccGridFacade);
  private popoverService = inject(IccPopoverService);
  private elementRef = inject(ElementRef);
  private _gridSetting!: IccGridSetting;
  rowSelections$:
    | Observable<{ selection: SelectionModel<object>; allSelected: boolean; indeterminate: boolean }>
    | undefined;

  @Input() set gridSetting(val: IccGridSetting) {
    this._gridSetting = { ...val };
    if (!this.rowSelections$) {
      this.rowSelections$ = this.gridFacade.selectRowSelections(this.gridSetting.gridId);
    }
  }
  get gridSetting(): IccGridSetting {
    return this._gridSetting;
  }
  @Input() gridConfig!: IccGridConfig;
  @Input() columns: IccColumnConfig[] = [];

  @Input() columnWidths: IccColumnWidth[] = [];

  @Output() columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() columnResized = new EventEmitter<IccColumnWidth[]>();

  get selectColumnWidth(): string {
    return `${ROW_SELECTION_CELL_WIDTH}px`;
  }

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  trackByIndex(index: number): number {
    return index;
  }

  get dragDisabled(): boolean {
    // TODO add each column enable/disable
    return !this.gridConfig.columnReorder;
  }

  onToggleSelectAll(allSelected: boolean): void {
    this.gridFacade.setSelectAllRows(this.gridSetting.gridId, !allSelected);
  }

  onColumnMenuClick(menuClick: ColumnMenuClick): void {
    let values: { [key: string]: boolean } = {};
    [...this.columns].forEach((column) => {
      values[column.name] = !column.hidden;
    });
    const popoverContext = {
      gridId: this.gridSetting.gridId,
      column: menuClick.column,
      values: values,
    };
    this.buildPopover(popoverContext, menuClick.event);
  }

  //build column menu use POINT not depened on the grid column so it will not close the menu panel
  private buildPopover(popoverContext: Object, event: MouseEvent): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.POINT,
      position: IccPosition.BOTTOM_END,
      event,
    };
    this.popoverService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      IccGridColumnMenuComponent,
      popoverContext,
    );
    this.showMenu();
  }

  private showMenu(): void {
    this.hideMenu();
    this.popoverService.show();
  }

  private hideMenu() {
    this.popoverService.hide();
  }
}
