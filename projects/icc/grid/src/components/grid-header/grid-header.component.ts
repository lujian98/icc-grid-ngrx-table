import { SelectionModel } from '@angular/cdk/collections';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccDynamicOverlayService } from '@icc/ui/overlay';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnResizeTriggerDirective } from '../../directives/column-resize-trigger.directive';
import { IccColumnResizeDirective } from '../../directives/column-resize.directive';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { IccColumnFilterComponent } from '../column-filter/column-filter.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';
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
  providers: [IccDynamicOverlayService],
})
export class IccGridHeaderComponent<T> {
  private gridFacade = inject(IccGridFacade);
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

  values: { [key: string]: boolean } = {};

  private _columns: IccColumnConfig[] = [];

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = [...val];

    [...this.columns].forEach((column) => {
      this.values[column.name] = !column.hidden;
    });
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

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
}
