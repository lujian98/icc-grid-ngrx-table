import { Injectable } from '@angular/core';
import { IccColumnConfig } from '@icc/ui/grid';
import { Observable, of } from 'rxjs';
import { IccTreeConfig, IccTreeData, iccFlattenTree } from '../models/tree-grid.model';

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
    const flatTree = iccFlattenTree([...inMemoryData], 0);
    // TODO filter ......

    return of([...flatTree]);
  }
}
