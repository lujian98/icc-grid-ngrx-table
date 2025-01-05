import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccGridFacade } from '../../+state/grid.facade';
import { DragDropEvent } from '../../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../models/grid-column.model';
import { getTableWidth, viewportWidthRatio } from '../../utils/viewport-width-ratio';
import { IccGridHeaderComponent } from '../grid-header/grid-header.component';
import { IccGridRowComponent } from '../grid-row/grid-row.component';
import { IccGridGroupHeaderComponent } from '../grid-header/grid-group-header/grid-group-header.component';

@Component({
  selector: 'icc-grid-header-view',
  templateUrl: './grid-header-view.component.html',
  styleUrls: ['./grid-header-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    IccGridHeaderComponent,
    IccGridRowComponent,
    IccGridGroupHeaderComponent,
  ],
})
export class IccGridHeaderViewComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
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
    this._columnWidths = values;
    this.gridColumnWidthsEvent.emit(values);
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

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
    this.tableWidth = this.gridConfig.horizontalScroll ? getTableWidth(this.columns) : this.gridConfig.viewportWidth;
    this.columnWidths = [...columns]
      .filter((column) => column.hidden !== true)
      .map((column) => {
        return {
          name: column.name,
          width: widthRatio * column.width!,
        };
      });
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
