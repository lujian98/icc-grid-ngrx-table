import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridConfig, IccColumnConfig } from '../../models/grid-column.model';
import { IccGridCellComponent } from './grid-cell/grid-cell.component';
import { IccGridCellViewComponent } from './grid-cell/grid-cell-view.component';
import { IccDynamicGridCellComponent } from './grid-cell/dynamic-grid-cell.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';

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
  @Input() gridConfig!: IccGridConfig;
  @Input() record: any;
  @Input() selected = false;

  @Output() toggleRow = new EventEmitter<any>();

  get displayedColumns():  string[] {
    return this.columns.map((column)=> column.name);
  }


  get totalWidth(): number {
    return this.columns
      .filter((column)=>!column.hidden)
      .map((column)=> (column.width || 100))
      .reduce((prev, curr) => prev + curr, 0);
  }

  getColumnWidth(column: IccColumnConfig): number {
    const viewportWidth = this.gridConfig.viewportWidth - (this.gridConfig.rowSelection ? 40 : 0);
    return viewportWidth * column.width! / this.totalWidth;
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
