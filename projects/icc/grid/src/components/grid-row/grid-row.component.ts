import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../models/grid-column.model';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccGridCellEditComponent } from '../grid-cell/grid-cell-edit/grid-cell-edit.component';
import { IccGridCellViewComponent } from '../grid-cell/grid-cell-view/grid-cell-view.component';
import { IccGridCellComponent } from '../grid-cell/grid-cell.component';

@Component({
  selector: 'icc-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IccGridCellComponent,
    IccGridCellViewComponent,
    IccGridCellEditComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridRowComponent<T> {
  private _record!: T;
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridConfig!: IccGridConfig;
  @Input() rowIndex!: number;
  @Input() selected = false;
  @Input() columnWidths: IccColumnWidth[] = [];

  @Input()
  set record(data: T) {
    this._record = data;
  }
  get record(): T {
    return this._record;
  }

  get selectColumnWidth(): string {
    return `${ROW_SELECTION_CELL_WIDTH}px`;
  }

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  isCellEditable(column: IccColumnConfig): boolean {
    return !!(this.gridConfig.gridEditable && column.cellEditable);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
