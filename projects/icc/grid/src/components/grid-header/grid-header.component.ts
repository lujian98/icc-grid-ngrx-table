import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccColumnResizeTriggerDirective } from '../../directives/column-resize-trigger.directive';
import { IccColumnResizeDirective } from '../../directives/column-resize.directive';
import { IccColumnConfig, IccGridConfig, IccColumnWidth } from '../../models/grid-column.model';
import { IccColumnFilterComponent } from '../column-filter/column-filter.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccGridHeaderCellComponent } from './grid-header-cell/grid-header-cell.component';
import { IccGridHeaderItemComponent } from './grid-header-item/grid-header-item.component';

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
  @Input() columns: IccColumnConfig[] = [];
  @Input() columnWidths: IccColumnWidth[] = [];
  @Input() gridConfig!: IccGridConfig;

  @Input() allSelected = false;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();
  @Output() columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() columnResized = new EventEmitter<IccColumnWidth[]>();

  getColumnWidth(index: number): number {
    return this.columnWidths[index].width;
  }

  trackByIndex(index: number): number {
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
