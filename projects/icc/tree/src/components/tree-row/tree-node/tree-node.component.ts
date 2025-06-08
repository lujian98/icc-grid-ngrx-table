import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, input } from '@angular/core';
import { IccColumnConfig, IccGridSetting } from '@icc/ui/grid';
import { IccIconModule } from '@icc/ui/icon';
import { IccTreeFacade } from '../../../+state/tree.facade';
import { IccTreeConfig, IccTreeNode } from '../../../models/tree-grid.model';

@Component({
  selector: 'icc-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccIconModule],
})
export class IccTreeNodeComponent<T> {
  private readonly treeFacade = inject(IccTreeFacade);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  gridSetting = input.required<IccGridSetting>();
  treeConfig = input.required<IccTreeConfig>();
  column = input.required<IccColumnConfig>();
  node = input.required({
    transform: (node: IccTreeNode<T>) => {
      this.changeDetectorRef.markForCheck();
      return node;
    },
  });

  get data(): T {
    const record = this.node() as T;
    return (record as { [index: string]: T })[this.column().name];
  }

  @HostListener('click') nodeToggle(): void {
    if (!this.node().leaf) {
      this.treeFacade.nodeToggle(this.gridSetting().gridId, this.treeConfig(), this.node());
    }
  }
}
