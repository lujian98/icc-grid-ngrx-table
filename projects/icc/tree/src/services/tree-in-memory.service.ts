import { Injectable } from '@angular/core';
import { IccColumnConfig, IccGridinMemoryService } from '@icc/ui/grid';
import { Observable, of } from 'rxjs';
import { IccTreeConfig, IccTreeData, iccFlattenTree } from '../models/tree-grid.model';

@Injectable({
  providedIn: 'root',
})
export class IccTreeinMemoryService extends IccGridinMemoryService {
  getTreeData<T>(
    treeConfig: IccTreeConfig,
    columns: IccColumnConfig[],
    inMemoryData: IccTreeData[],
  ): Observable<IccTreeData[]> {
    console.log('tree service inMemoryData=', inMemoryData);
    const flatTree = iccFlattenTree([...inMemoryData], 0);

    const filterParams = this.getFilterParams(treeConfig.columnFilters, columns);
    const filteredData = this.getFilteredData([...flatTree], filterParams);

    return of([...filteredData]);
  }
}
