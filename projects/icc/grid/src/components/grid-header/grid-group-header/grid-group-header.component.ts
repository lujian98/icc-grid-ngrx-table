import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { ROW_SELECTION_CELL_WIDTH } from '../../../models/constants';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../../models/grid-column.model';
import { IccRowSelectComponent } from '../../row-select/row-select.component';
import { IccGridHeaderItemComponent } from '../grid-header-item/grid-header-item.component';

@Component({
  selector: 'icc-grid-group-header',
  templateUrl: './grid-group-header.component.html',
  styleUrls: ['./grid-group-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccRowSelectComponent, IccGridHeaderItemComponent],
})
export class IccGridGroupHeaderComponent {
  //private elementRef = inject(ElementRef);
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridConfig!: IccGridConfig;
  @Input() columnWidths: IccColumnWidth[] = [];

  rowSelectionCellWidth = ROW_SELECTION_CELL_WIDTH;

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  trackByIndex(index: number): number {
    return index;
  }
}
