import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IccColumnConfig, IccColumnFilter, IccGridConfig, IccGridData, IccSortField } from '@icc/ui/grid';

import { IccTreeConfig, IccTreeData } from '../models/tree-grid.model';

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
    return of([...inMemoryData]);

    /*
    return of({
      data: [...inMemoryData],
      totalCounts: inMemoryData.length,
    });
    */
  }
}
