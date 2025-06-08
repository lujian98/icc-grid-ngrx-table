import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  IccColumnConfig,
  IccColumnWidth,
  IccGridCellComponent,
  IccGridCellViewComponent,
  IccGridSetting,
  ROW_SELECTION_CELL_WIDTH,
} from '@icc/ui/grid';
import { IccTreeConfig, IccTreeNode } from '../../models/tree-grid.model';
import { IccTreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'icc-tree-row',
  templateUrl: './tree-row.component.html',
  styleUrls: ['./tree-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccTreeNodeComponent, IccGridCellComponent, IccGridCellViewComponent],
})
export class IccTreeRowComponent<T> {
  columns = input.required<IccColumnConfig[]>();
  gridSetting = input.required<IccGridSetting>();
  treeConfig = input.required<IccTreeConfig>();
  record = input.required<IccTreeNode<T>>();
  columnWidths = input.required<IccColumnWidth[]>();
  rowIndex = input.required<number>();

  get treeColumn(): IccColumnConfig | undefined {
    return this.columns().find((col) => col.name === 'name');
  }

  get nodePadding(): number {
    return (this.record().level! + 1) * 10;
  }

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths().find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  get selectColumnWidth(): string {
    return `${ROW_SELECTION_CELL_WIDTH}px`;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
