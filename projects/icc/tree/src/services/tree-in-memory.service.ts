import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IccColumnConfig, IccColumnFilter, IccGridConfig, IccGridData, IccSortField } from '@icc/ui/grid';

import { IccTreeConfig, IccTreeData, IccTreeNode } from '../models/tree-grid.model';

function flattenTree<T>(nodes: IccTreeNode<T>[], level: number): IccTreeNode<T>[] {
  const result: IccTreeNode<T>[] = [];
  for (const node of nodes) {
    result.push({ ...node, level });
    if (node.children) {
      result.push(...flattenTree(node.children, level + 1));
    }
  }
  return result;
}

@Injectable({
  providedIn: 'root',
})
export class IccTreeinMemoryService {
  getTreeData<T>(
    treeConfig: IccTreeConfig,
    columns: IccColumnConfig[],
    inMemoryData: IccTreeData[],
  ): Observable<IccTreeData[]> {
    console.log('tree service inMemoryData=', inMemoryData);
    const flatTree = flattenTree([...inMemoryData], 0);
    return of([...flatTree]);

    /*
    return of({
      data: [...inMemoryData],
      totalCounts: inMemoryData.length,
    });
    */
  }
}
