import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../../models/grid-column.model';
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
export class IccGridRowComponent {
  @Input() columns: IccColumnConfig[] = [];
  @Input() record: any;
  @Input() selected = false;

  @Output() toggleRow = new EventEmitter<any>();

  get displayedColumns():  string[] {
    return this.columns.map((column)=> column.name);
  }

  constructor() {
    console.log( ' grid row loaded ')
  }

  trackByIndex(tmp: any, index: number): number {
    console.log( 'tmp=', tmp)
    return index;
  }

  toggleRowSelection() {
    console.log( ' row columns=', this.columns)
    console.log( ' row record=', this.record)
    this.toggleRow.emit({
      dataItem: this.record,
      //selectionType: this.selectionType
    });
  }
}
