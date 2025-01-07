import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, inject, Input } from '@angular/core';
import { IccGridFacade } from '../../+state/grid.facade';
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
  private gridFacade = inject(IccGridFacade);
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

  //@Output() toggleRow = new EventEmitter<any>();

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

  /*
  toggleRowSelection() {
    //console.log( ' row columns=', this.columns)
    //console.log( ' row record=', this.record)
    this.toggleRow.emit({
      dataItem: this.record,
      //selectionType: this.selectionType
    });
  }*/

  @HostBinding('class.icc-grid-row')
  get iccGridRow() {
    return true;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.gridFacade.setSelectRows(this.gridConfig, [this.record], !this.selected);
  }
}
