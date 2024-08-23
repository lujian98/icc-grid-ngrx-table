import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../+state/grid.facade';
import { DragDropEvent } from '../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../models/grid-column.model';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridViewportComponent } from './grid-viewport/grid-viewport.component';
import { IccRowSelectComponent } from './row-select/row-select.component';
import { MIN_GRID_COLUMN_WIDTH } from '../models/constants';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    IccGridViewportComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridViewComponent<T> {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _columnWidths: IccColumnWidth[] = [];
  private firstTimeLoadColumnsConfig = true;
  gridData$!: Observable<T[]>;

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = val;
    this.setColumWidths();
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    if (this.gridConfig.remoteColumnsConfig && this.firstTimeLoadColumnsConfig) {
      this.firstTimeLoadColumnsConfig = false;
      this.gridFacade.setupGridColumnsConfig(this.gridConfig.gridName, []);
    }
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
    this.setColumWidths();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  get totalWidth(): number {
    return this.columns
      .filter((column) => !column.hidden)
      .map((column) => (column.width || MIN_GRID_COLUMN_WIDTH))
      .reduce((prev, curr) => prev + curr, 0);
  }

  get widthRatio(): number {
    const viewportWidth = this.gridConfig.viewportWidth - (this.gridConfig.rowSelection ? 40 : 0);
    return viewportWidth / this.totalWidth;
  }

  set columnWidths(values: IccColumnWidth[]) {
    this._columnWidths = values;
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.columnWidths = columnWidths;
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    this.columnWidths = columnWidths;
    const columns: IccColumnConfig[] = [...this.columns].map((column, index) => {
      return {
        ...column,
        width: this.columnWidths[index].width / this.widthRatio,
      }
    });
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  private setColumWidths(): void {
    this.columnWidths = [...this.columns].map((column) => ({
      name: column.name,
      width: this.widthRatio * column.width!,
    }));
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
