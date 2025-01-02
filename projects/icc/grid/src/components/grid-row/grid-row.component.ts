import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccColumnConfig, IccGridConfig, IccColumnWidth } from '../../models/grid-column.model';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccDynamicGridCellComponent } from './grid-cell/dynamic-grid-cell.component';
import { IccGridCellComponent } from './grid-cell/grid-cell.component';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';

@Component({
  selector: 'icc-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridCellComponent, IccDynamicGridCellComponent, IccRowSelectComponent],
})
export class IccGridRowComponent<T> {
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridConfig!: IccGridConfig;
  private _record!: T;
  @Input() selected = false;

  @Input() columnWidths: IccColumnWidth[] = [];

  @Input()
  set record(data: T) {
    this._record = data;
  }
  get record(): T {
    return this._record;
  }

  @Output() toggleRow = new EventEmitter<any>();

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

  toggleRowSelection() {
    //console.log( ' row columns=', this.columns)
    //console.log( ' row record=', this.record)
    this.toggleRow.emit({
      dataItem: this.record,
      //selectionType: this.selectionType
    });
  }
}
