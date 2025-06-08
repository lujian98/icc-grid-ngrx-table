import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { IccGridCellEditComponent } from '../grid-cell/grid-cell-edit/grid-cell-edit.component';
import { IccGridCellViewComponent } from '../grid-cell/grid-cell-view/grid-cell-view.component';
import { IccGridCellComponent } from '../grid-cell/grid-cell.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';

@Component({
  selector: 'icc-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccGridCellComponent, IccGridCellViewComponent, IccGridCellEditComponent, IccRowSelectComponent],
})
export class IccGridRowComponent<T> {
  columns = input.required<IccColumnConfig[]>();
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  rowIndex = input.required<number>();
  selected = input.required<boolean>();
  columnWidths = input.required<IccColumnWidth[]>();
  record = input.required<T>();

  get selectColumnWidth(): string {
    return `${ROW_SELECTION_CELL_WIDTH}px`;
  }

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths().find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  isCellEditable(column: IccColumnConfig): boolean {
    return !!(this.gridSetting().gridEditable && column.cellEditable);
  }
}
