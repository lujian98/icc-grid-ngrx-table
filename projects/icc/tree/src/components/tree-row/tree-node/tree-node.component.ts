import { ChangeDetectorRef, ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { IccColumnConfig } from '@icc/ui/grid';
import { IccTreeNode } from '../../../models/tree-grid.model';

@Component({
  selector: 'icc-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkTableModule],
})
export class IccTreeNodeComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _record!: IccTreeNode<T>;
  @Input() column!: IccColumnConfig;

  @Input()
  set record(data: IccTreeNode<T>) {
    this._record = { ...data };
    //console.log( ' node =', this.record)
    this.changeDetectorRef.markForCheck();
  }
  get record(): IccTreeNode<T> {
    return this._record;
  }

  get data(): T {
    // console.log(' get record =', this.column.name)
    return (this.record as any)[this.column.name];
  }
}
