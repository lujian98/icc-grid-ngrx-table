import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccColumnConfig } from '@icc/ui/grid';
import { IccIconModule } from '@icc/ui/icon';
import { IccTreeNode, IccTreeConfig } from '../../../models/tree-grid.model';
import { IccTreeFacade } from '../../../+state/tree.facade';

@Component({
  selector: 'icc-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccIconModule],
})
export class IccTreeNodeComponent<T> {
  private treeFacade = inject(IccTreeFacade);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _node!: IccTreeNode<T>;

  @Input() treeConfig!: IccTreeConfig;
  @Input() column!: IccColumnConfig;

  @Input()
  set node(data: IccTreeNode<T>) {
    this._node = { ...data };
    this.changeDetectorRef.markForCheck();
  }
  get node(): IccTreeNode<T> {
    return this._node;
  }

  get data(): T {
    return (this.node as any)[this.column.name];
  }

  @HostListener('click') nodeToggle(): void {
    if (!this.node.leaf) {
      this.treeFacade.nodeToggle(this.treeConfig, this.node);
    }
  }
}
