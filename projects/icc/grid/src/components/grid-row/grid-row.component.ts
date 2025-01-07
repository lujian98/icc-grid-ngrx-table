import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../models/grid-column.model';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccDynamicGridCellComponent } from './grid-cell/dynamic-grid-cell.component';
import { IccGridCellComponent } from './grid-cell/grid-cell.component';

@Component({
  selector: 'icc-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridCellComponent, IccDynamicGridCellComponent, IccRowSelectComponent],
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

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  get selectColumnWidth(): string {
    return `${ROW_SELECTION_CELL_WIDTH}px`;
  }

  trackByIndex(index: number): number {
    return index;
  }

  @HostBinding('class.icc-grid-row')
  get iccGridRow() {
    return true;
  }
}
