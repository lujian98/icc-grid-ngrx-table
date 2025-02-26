import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IccColumnConfig,
  IccColumnWidth,
  IccGridCellViewComponent,
  IccGridCellComponent,
  ROW_SELECTION_CELL_WIDTH,
  IccGridSetting,
} from '@icc/ui/grid';
import { IccTreeConfig, IccTreeNode } from '../../models/tree-grid.model';
import { IccTreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'icc-tree-row',
  templateUrl: './tree-row.component.html',
  styleUrls: ['./tree-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTreeNodeComponent, IccGridCellComponent, IccGridCellViewComponent],
})
export class IccTreeRowComponent<T> {
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridSetting!: IccGridSetting;
  @Input() treeConfig!: IccTreeConfig;
  @Input() record!: IccTreeNode<T>;
  @Input() selected = false;
  @Input() columnWidths: IccColumnWidth[] = [];

  get treeColumn(): IccColumnConfig | undefined {
    return this.columns.find((col) => col.name === 'name');
  }

  get nodePadding(): number {
    return (this.record.level! + 1) * 10;
  }

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
}
