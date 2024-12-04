import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccGridFacade } from '../../+state/grid.facade';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { DragDropEvent } from '../../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../models/grid-column.model';
import { getTableWidth, viewportWidthRatio } from '../../utils/viewport-width-ratio';
import { IccGridHeaderComponent } from '../grid-header/grid-header.component';
import { IccGridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'icc-grid-header-view',
  templateUrl: './grid-header-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DragDropModule, ScrollingModule, IccGridHeaderComponent, IccGridRowComponent],
})
export class IccGridHeaderViewComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _gridTemplateColumns: string = '';
  private _columnWidths: IccColumnWidth[] = [];
  tableWidth: number = 1000;

  @Input() columnHeaderPosition: number = 0;

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = [...val];
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set columnWidths(values: IccColumnWidth[]) {
    //console.log( ' eeeeeeeeeeeeee columnWidths=', this.columnWidths)
    this._columnWidths = values;
    this.gridColumnWidthsEvent.emit(values);
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

  set gridTemplateColumns(value: string) {
    this._gridTemplateColumns = value;
    this.gridTemplateColumnsEvent.emit(value);
  }

  get gridTemplateColumns(): string {
    return this._gridTemplateColumns;
  }

  @Output() gridTemplateColumnsEvent = new EventEmitter<string>();
  @Output() gridColumnWidthsEvent = new EventEmitter<IccColumnWidth[]>();

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.setColumWidths(columnWidths, 1);
    if (this.gridConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(columnWidths);
    }
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    const columns: IccColumnConfig[] = [...this.columns].map((column, index) => ({
      ...column,
      width: columnWidths[index].width / widthRatio,
    }));
    this.setColumWidths(columnWidths, widthRatio);
    this.gridFacade.setGridColumnsConfig(this.gridConfig, columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig, columns);
  }

  private setColumWidths(columns: any[], widthRatio: number): void {
    if (this.gridConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(this.columns);
    } else {
      this.tableWidth = this.gridConfig.viewportWidth;
    }

    this.columnWidths = [...columns]
      .filter((column) => column.hidden !== true)
      .map((column) => {
        return {
          name: column.name,
          width: widthRatio * column.width!,
        };
      });

    const colWidths = [...columns]
      .filter((column) => column.hidden !== true)
      .map((column) => widthRatio * column.width! + 'px')
      .join(' ');
    this.gridTemplateColumns = this.gridConfig.rowSelection ? `${ROW_SELECTION_CELL_WIDTH}px ${colWidths}` : colWidths;
    //console.log(' this.gridTemplateColumns=', this.gridTemplateColumns)
  }

  private indexCorrection(idx: number): number {
    this.columns.forEach((column, index) => {
      if (column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }
}
