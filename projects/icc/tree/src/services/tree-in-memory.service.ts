import { Injectable } from '@angular/core';
import { IccColumnConfig, IccGridinMemoryService } from '@icc/ui/grid';
import { Observable, of } from 'rxjs';
import { IccTreeConfig, IccTreeData } from '../models/tree-grid.model';
import { iccFlattenTree } from '../utils/nested-tree';

@Injectable({
  providedIn: 'root',
})
export class IccTreeinMemoryService extends IccGridinMemoryService {
  getTreeData<T>(
    treeConfig: IccTreeConfig,
    columns: IccColumnConfig[],
    inMemoryData: IccTreeData[],
  ): Observable<IccTreeData[]> {
    const sortedData = this.sortTree([...inMemoryData], treeConfig);
    const flatTree = iccFlattenTree([...sortedData], 0);
    const filterParams = this.getFilterParams(treeConfig.columnFilters, columns);
    const filteredData = this.getFilteredData([...flatTree], filterParams);
    return of([...filteredData]);
  }

  private sortTree(nodes: IccTreeData[], treeConfig: IccTreeConfig): IccTreeData[] {
    const sorts = treeConfig.sortFields;
    if (sorts && sorts.length > 0 && sorts[0].field === 'name') {
      const sort = sorts[0];
      return this.sortNodes(nodes, sort.field, sort.dir);
    }
    return nodes;
  }

  private sortNodes(nodes: IccTreeData[], field: string, dir: string): IccTreeData[] {
    return this.dataSortByField([...nodes], field, dir).map((node) => {
      return {
        ...node,
        children: node.children ? this.sortNodes([...node.children], field, dir) : undefined,
      };
    });
  }
}
