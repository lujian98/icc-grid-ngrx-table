import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccDynamicGridCellComponent } from './grid-cell/dynamic-grid-cell.component';
import { IccGridCellViewComponent } from './grid-cell/grid-cell-view.component';
import { IccGridCellComponent } from './grid-cell/grid-cell.component';

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
export class IccGridRowComponent implements OnChanges {
  @Input() columns: IccColumnConfig[] = [];
  @Input() columnWidths: any[] = [];
  @Input() gridConfig!: IccGridConfig;
  @Input() record: any;
  @Input() selected = false;

  @Output() toggleRow = new EventEmitter<any>();

  getColumnWidth(index: number): number {
    return this.columnWidths[index].width;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log( ' wwww changes =', changes)
  }

  trackByIndex(tmp: any, index: number): number {
    //console.log( 'tmp=', tmp)
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
