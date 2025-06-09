import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output } from '@angular/core';
import { IccColumnResizeTriggerDirective } from '../../../directives/column-resize-trigger.directive';
import { IccColumnResizeDirective } from '../../../directives/column-resize.directive';
import { ROW_SELECTION_CELL_WIDTH } from '../../../models/constants';
import {
  IccColumnConfig,
  IccColumnWidth,
  IccGridConfig,
  IccGridSetting,
  IccGroupHeader,
} from '../../../models/grid-column.model';
import { IccGridHeaderItemComponent } from '../grid-header-item/grid-header-item.component';

@Component({
  selector: 'icc-grid-group-header',
  templateUrl: './grid-group-header.component.html',
  styleUrls: ['./grid-group-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccGridHeaderItemComponent, IccColumnResizeTriggerDirective, IccColumnResizeDirective],
})
export class IccGridGroupHeaderComponent {
  rowSelectionCellWidth = ROW_SELECTION_CELL_WIDTH;
  columns = input.required<IccColumnConfig[]>();
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  columnWidths = input<IccColumnWidth[]>([]);
  groupHeaderColumns = computed(() => {
    let groupHeaders: IccGroupHeader[] = [];
    this.columns().forEach((column) => {
      if (!column.hidden) {
        groupHeaders = this.getGroupHeader(column, groupHeaders);
      }
    });
    return groupHeaders;
  });

  @Output() columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() columnResized = new EventEmitter<IccColumnWidth[]>();

  getColumn(header: IccGroupHeader): IccColumnConfig {
    return this.columns().find((col) => col.name === header.field)!;
  }

  private getGroupHeader(column: IccColumnConfig, groupHeaders: IccGroupHeader[]): IccGroupHeader[] {
    if (column.groupHeader) {
      const find = groupHeaders.find((item) => item.name === column.groupHeader?.name);
      if (!find) {
        const groupHeader = column.groupHeader;
        groupHeader.isGroupHeader = true;
        groupHeader.field = column.name;
        groupHeaders.push(groupHeader);
      } else {
        find.field = column.name;
      }
    } else {
      groupHeaders.push({
        name: `group${column.name}`,
        title: '',
        isGroupHeader: false,
        field: column.name,
      });
    }
    return groupHeaders;
  }

  getHeaderWidth(header: IccGroupHeader): string {
    let width = 0;
    if (!header.isGroupHeader) {
      width = this.columnWidths().find((col) => col.name === header.field)!.width;
    } else {
      const columns = this.columns().filter((col) => col.groupHeader?.name === header.name);
      columns.forEach((column) => {
        const find = this.columnWidths().find((col) => col.name === column.name);
        if (find) {
          width += find.width;
        }
      });
    }
    return width ? `${width}px` : '';
  }
}
