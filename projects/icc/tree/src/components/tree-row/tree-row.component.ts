import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IccColumnConfig,
  IccGridCellComponent,
  IccDynamicGridCellComponent,
  IccRowSelectComponent,
  IccColumnWidth,
} from '@icc/ui/grid';
import { IccTreeConfig, IccTreeNode } from '../../models/tree-grid.model';
import { IccTreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'icc-tree-row',
  templateUrl: './tree-row.component.html',
  styleUrls: ['./tree-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccTreeNodeComponent,
    IccGridCellComponent,
    IccDynamicGridCellComponent,
    IccRowSelectComponent,
  ],
})
export class IccTreeRowComponent<T> {
  @Input() columns: IccColumnConfig[] = [];
  @Input() treeConfig!: IccTreeConfig;
  @Input() record!: IccTreeNode<T>;
  @Input() selected = false;
  @Input() columnWidths: IccColumnWidth[] = [];

  @Output() toggleRow = new EventEmitter<any>();

  get treeColumn(): IccColumnConfig | undefined {
    return this.columns.find((col) => col.name === 'name');
  }

  get nodePadding(): number {
    return (this.record.level! + 1) * 10;
  }

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    //console.log(' this.columnWidths =', this.columnWidths)
    //console.log(' width =', width)
    return width ? `${width}px` : '';
  }

  trackByIndex(index: number): number {
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
