import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import {
  IccColumnConfig,
  IccColumnWidth,
  getTableWidth,
  viewportWidthRatio,
  IccGridHeaderComponent,
  ROW_SELECTION_CELL_WIDTH,
  DragDropEvent,
  IccGridRowComponent,
  IccGridFacade,
} from '@icc/ui/grid';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import { IccTreeDataSource } from '../../models/tree-datasource';
import { IccTreeNode } from '../../models/tree-grid.model';

function flattenNodes<T>(nodes: IccTreeNode<T>[]): IccTreeNode<T>[] {
  const flattenedNodes = [];
  for (const node of nodes) {
    flattenedNodes.push(node);
    if (node.children) {
      flattenedNodes.push(...flattenNodes(node.children));
    }
  }
  return flattenedNodes;
}

@Component({
  selector: 'icc-flat-tree',
  templateUrl: './flat-tree.component.html',
  styleUrls: ['./flat-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkTreeModule, ScrollingModule, IccButtonComponent, IccIconModule],
})
export class IccFlatTreeComponent<T> {
  private _columns: IccColumnConfig[] = [];
  private _treeData!: IccTreeNode<T>[];
  dataSource = new IccTreeDataSource<IccTreeNode<T>>([]);

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = [...val];
    //const widthRatio = viewportWidthRatio(this.treeConfig, this.columns);
    //this.setColumWidths(this.columns, widthRatio);
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set treeData(val: IccTreeNode<T>[]) {
    //console.log(' flat tree data=', val);
    this._treeData = val;
    this.dataSource.data = this._treeData;
  }
  get treeData(): IccTreeNode<T>[] {
    return this._treeData;
  }

  @ViewChild(CdkTree) tree!: CdkTree<IccTreeNode<T>>;

  childrenAccessor = (dataNode: IccTreeNode<T>) => dataNode.children ?? [];

  hasChild = (_: number, node: IccTreeNode<T>) => !!node.children?.length;

  private getParentNode(node: IccTreeNode<T>): IccTreeNode<T> | null {
    for (const parent of flattenNodes(this.treeData)) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }
    return null;
  }

  shouldRender(node: IccTreeNode<T>): boolean {
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

/*
  flatTreeData: TreeNode[] = [];

  constructor() {
    const treeData: TreeNode[] = [
      // Your tree data
    ];
    this.flatTreeData = this.flattenTree(treeData, 0);
  }

  flattenTree(nodes: TreeNode[], level: number): TreeNode[] {
    const result: TreeNode[] = [];
    for (const node of nodes) {
      result.push({ ...node, level });
      if (node.children) {
        result.push(...this.flattenTree(node.children, level + 1));
      }
    }
    return result;
  }
    */
