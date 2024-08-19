import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccGridHeaderCellComponent } from './grid-header-cell/grid-header-cell.component';
import { IccGridHeaderItemComponent } from './grid-header-item/grid-header-item.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { ColumnResizeEvent } from '../../models/column-resize-event';
import { IccColumnResizeDirective } from '../../directives/column-resize.directive';
import { IccColumnResizeTriggerDirective } from '../../directives/column-resize-trigger.directive';
import { IccColumnFilterComponent } from '../column-filter/column-filter.component';

@Component({
  selector: 'icc-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    IccGridHeaderCellComponent,
    IccGridHeaderItemComponent,
    IccColumnResizeDirective,
    IccColumnResizeTriggerDirective,
    IccColumnFilterComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridHeaderComponent {
  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridConfig!: IccGridConfig;

  @Input() allSelected = false;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();
  @Output() columnResizing = new EventEmitter<ColumnResizeEvent>();
  @Output() columnResized = new EventEmitter<ColumnResizeEvent>();

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.name);
  }

  trackByIndex(tmp: any, index: number): number {
    console.log( 'tmp=', tmp)
    return index;
  }

  get dragDisabled(): boolean {
    return false;
    //return !this.columnConfig.columnReorder;
  }

  onToggleSelectAllRowsOnCurrentPage() {
    //console.log( ' view columnConfig=', this.columnConfig)
    //this.toggleSelectAllRowsOnCurrentPage.emit(!this.allSelected);
  }
}
