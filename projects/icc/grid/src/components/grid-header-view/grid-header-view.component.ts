import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { IccGridFacade } from '../../+state/grid.facade';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { DragDropEvent } from '../../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { getTableWidth, viewportWidthRatio } from '../../utils/viewport-width-ratio';
import { IccGridGroupHeaderComponent } from '../grid-header/grid-group-header/grid-group-header.component';
import { IccGridHeaderComponent } from '../grid-header/grid-header.component';

@Component({
  selector: 'icc-grid-header-view',
  templateUrl: './grid-header-view.component.html',
  styleUrls: ['./grid-header-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DragDropModule, ScrollingModule, IccGridHeaderComponent, IccGridGroupHeaderComponent],
})
export class IccGridHeaderViewComponent {
  private readonly gridFacade = inject(IccGridFacade);
  private _columnWidths: IccColumnWidth[] = [];
  tableWidth: number = 1000;
  gridSetting = input.required<IccGridSetting>();
  columnHeaderPosition = input<number>(0);
  gridConfig = input.required<IccGridConfig>();
  columnConfigs = input.required<IccColumnConfig[]>();
  columns = signal<IccColumnConfig[]>([]);

  set columnWidths(values: IccColumnWidth[]) {
    this._columnWidths = values;
    this.gridColumnWidthsEvent.emit(values);
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

  @Output() gridColumnWidthsEvent = new EventEmitter<IccColumnWidth[]>();

  constructor() {
    effect(() => {
      if (this.columnConfigs()) {
        this.columns.set(this.columnConfigs());
      }
      const widthRatio = viewportWidthRatio(this.gridConfig(), this.gridSetting(), this.columns());
      this.setColumWidths(this.columns(), widthRatio);
    });
  }

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.setColumWidths(columnWidths, 1);
    if (this.gridConfig().horizontalScroll) {
      this.tableWidth = getTableWidth(columnWidths);
    }
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    const widthRatio = viewportWidthRatio(this.gridConfig(), this.gridSetting(), this.columns());
    const columns: IccColumnConfig[] = [...this.columns()].map((column, index) => ({
      ...column,
      width: columnWidths[index].width / widthRatio,
    }));
    this.setColumWidths(columnWidths, widthRatio);
    this.gridFacade.setGridColumnsConfig(this.gridConfig(), this.gridSetting(), columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    if (this.gridConfig().groupHeader) {
      this.moveGroupHeader(previousIndex, currentIndex);
    } else {
      this.moveColumn(previousIndex, currentIndex);
    }
  }

  private moveGroupHeader(previousIndex: number, currentIndex: number): void {
    const moved = this.columns()[previousIndex];
    const changed = this.columns()[currentIndex];
    if (!moved.groupHeader && !changed.groupHeader) {
      this.moveColumn(previousIndex, currentIndex);
    } else if (moved.groupHeader?.name === changed.groupHeader?.name) {
      this.moveColumn(previousIndex, currentIndex);
    } else if (moved.groupHeader && !changed.groupHeader) {
      if (currentIndex < previousIndex) {
        const lastIndex = this.lastIndex(moved.groupHeader?.name);
        this.moveColumn(currentIndex, lastIndex);
      } else {
        const firstIndex = this.firstIndex(moved.groupHeader?.name);
        this.moveColumn(currentIndex, firstIndex);
      }
    } else if (!moved.groupHeader && changed.groupHeader) {
      if (currentIndex < previousIndex) {
        const firstIndex = this.firstIndex(changed.groupHeader?.name);
        this.moveColumn(previousIndex, firstIndex);
      } else {
        const lastIndex = this.lastIndex(changed.groupHeader?.name);
        this.moveColumn(previousIndex, lastIndex);
      }
    } else if (moved.groupHeader && changed.groupHeader) {
      const columns = [...this.columns()];
      if (currentIndex < previousIndex) {
        let newIndex = currentIndex;
        this.columns().forEach((col, index) => {
          if (col.groupHeader?.name === moved.groupHeader?.name) {
            moveItemInArray(columns, index, newIndex);
            newIndex++;
          }
        });
      } else if (currentIndex > previousIndex) {
        let newIndex = previousIndex;
        this.columns().forEach((col, index) => {
          if (col.groupHeader?.name === changed.groupHeader?.name) {
            moveItemInArray(columns, index, newIndex);
            newIndex++;
          }
        });
      }
      this.gridFacade.setGridColumnsConfig(this.gridConfig(), this.gridSetting(), columns);
      this.columns.set(columns);
    }
  }

  private firstIndex(name: string): number {
    return this.columns().findIndex((col) => col.groupHeader?.name === name);
  }

  private lastIndex(name: string): number {
    const index = [...this.columns()]
      .slice()
      .reverse()
      .findIndex((col) => col.groupHeader?.name === name);
    return this.columns().length - 1 - index;
  }

  private moveColumn(previousIndex: number, currentIndex: number): void {
    const columns = [...this.columns()];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig(), this.gridSetting(), columns);
  }

  private setColumWidths(columns: IccColumnConfig[], widthRatio: number): void {
    this.tableWidth = this.gridConfig().horizontalScroll
      ? getTableWidth(this.columns())
      : this.gridSetting().viewportWidth;
    const displayColumns = [...columns].filter((column) => column.hidden !== true);
    let tot = this.gridConfig().rowSelection ? ROW_SELECTION_CELL_WIDTH : 0;
    this.columnWidths = displayColumns.map((column, index) => {
      let width = Math.round(widthRatio * column.width!);
      tot += width;
      if (index === displayColumns.length - 1) {
        width += this.tableWidth - tot;
      }
      return {
        name: column.name,
        width: width,
      };
    });
  }

  private indexCorrection(idx: number): number {
    this.columns().forEach((column, index) => {
      if (column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }
}
