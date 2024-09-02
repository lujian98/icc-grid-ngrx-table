import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  IccColumnConfig,
  IccColumnWidth,
  IccGridConfig,
} from '../../models/grid-column.model';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccDynamicGridCellComponent } from './grid-cell/dynamic-grid-cell.component';
import { IccGridCellViewComponent } from './grid-cell/grid-cell-view.component';
import { IccGridCellComponent } from './grid-cell/grid-cell.component';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';

@Component({
  selector: 'icc-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridCellViewComponent,
    IccGridCellComponent,
    IccDynamicGridCellComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridRowComponent<T> {
  @Input() columns: IccColumnConfig[] = [];
  @Input() columnWidths: IccColumnWidth[] = [];
  @Input() gridConfig!: IccGridConfig;
  @Input() record!: T;
  @Input() selected = false;

  @Output() toggleRow = new EventEmitter<any>();

  rowSelectionCellWidth = ROW_SELECTION_CELL_WIDTH;

  getColumnWidth(index: number): number {
    return this.columnWidths[index].width;
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
