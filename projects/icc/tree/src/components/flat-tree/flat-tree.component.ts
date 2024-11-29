import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, Input } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import { IccTreeConfig, defaultTreeConfig, IccTreeData } from '../../models/tree-grid.model';
import { IccTreeDataSource } from '../../models/tree-datasource';

function flattenNodes(nodes: NestedFoodNode[]): NestedFoodNode[] {
  const flattenedNodes = [];
  for (const node of nodes) {
    flattenedNodes.push(node);
    if (node.children) {
      flattenedNodes.push(...flattenNodes(node.children));
    }
  }
  return flattenedNodes;
}

interface NestedFoodNode {
  name: string;
  children?: NestedFoodNode[];
}

/*
const NESTED_DATA: NestedFoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
*/

@Component({
  selector: 'icc-flat-tree',
  templateUrl: './flat-tree.component.html',
  styleUrls: ['./flat-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkTreeModule, ScrollingModule, IccButtonComponent, IccIconModule],
})
export class IccFlatTreeComponent<T> {
  private _treeData!: NestedFoodNode[];
  dataSource!: ArrayDataSource<NestedFoodNode>; // = new ArrayDataSource(NESTED_DATA);
  @Input()
  set treeData(val: any) {
    console.log(' flat tree data=', val);
    this._treeData = val;
    // TODO custom data source
    this.dataSource = new ArrayDataSource(this._treeData);
  }
  get treeData(): any {
    return this._treeData;
  }

  @ViewChild(CdkTree) tree!: CdkTree<NestedFoodNode>;

  childrenAccessor = (dataNode: NestedFoodNode) => dataNode.children ?? [];
  //dataSource = new ArrayDataSource(NESTED_DATA);

  hasChild = (_: number, node: NestedFoodNode) => !!node.children?.length;

  getParentNode(node: NestedFoodNode) {
    for (const parent of flattenNodes(this.treeData)) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }

    return null;
  }

  shouldRender(node: NestedFoodNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!this.tree.isExpanded(parent)) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
}
