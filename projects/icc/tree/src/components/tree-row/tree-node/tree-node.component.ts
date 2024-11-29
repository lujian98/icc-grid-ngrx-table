import { ChangeDetectorRef, ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccColumnConfig } from '@icc/ui/grid';
import { IccIconModule } from '@icc/ui/icon';
import { IccTreeNode } from '../../../models/tree-grid.model';

@Component({
  selector: 'icc-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccIconModule],
})
export class IccTreeNodeComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _node!: IccTreeNode<T>;
  @Input() column!: IccColumnConfig;

  @Input()
  set node(data: IccTreeNode<T>) {
    this._node = { ...data };
    console.log(' node =', this.node);
    this.changeDetectorRef.markForCheck();
  }
  get node(): IccTreeNode<T> {
    return this._node;
  }

  get data(): T {
    // console.log(' get record =', this.column.name)
    return (this.node as any)[this.column.name];
  }
}
