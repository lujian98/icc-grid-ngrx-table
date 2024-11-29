import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as treeActions from './tree.actions';
import { selectTreeData, selectTreeInMemoryData } from './tree.selectors';
import { IccTreeConfig } from '../models/tree-grid.model';

@Injectable()
export class IccTreeFacade {
  private store = inject(Store);

  initTreeConfig(treeConfig: IccTreeConfig): void {
    this.store.dispatch(treeActions.initTreeConfig({ treeConfig }));
  }

  /*
  setViewportPageSize(gridConfig: IccGridConfig, pageSize: number, viewportWidth: number): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridConfig, pageSize, viewportWidth }));
    if (gridConfig.viewportReady) {
      this.getGridData(gridConfig.gridId);
    }
  }

  setGridSortFields(gridId: string, sortFields: IccSortField[]): void {
    this.store.dispatch(gridActions.setGridSortFields({ gridId, sortFields }));
    this.getGridData(gridId);
  }

  setGridColumnFilters(gridId: string, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridId, columnFilters }));
    this.getGridData(gridId);
  }
    
  getGridPageData(gridId: string, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridId, page }));
    this.getGridData(gridId);
  }

  */

  getTreeData(treeId: string): void {
    this.store.dispatch(treeActions.getTreeData({ treeId }));
  }

  setTreeData(treeId: string, treeData: any): void {
    this.store.dispatch(treeActions.getTreeDataSuccess({ treeId, treeData }));
  }

  setTreeInMemoryData(treeId: string, treeData: any): void {
    this.store.dispatch(treeActions.setTreeInMemoryData({ treeId, treeData }));
    this.getTreeData(treeId);
  }

  clearTreeDataStore(treeId: string): void {
    this.store.dispatch(treeActions.clearTreeDataStore({ treeId }));
  }

  selectTreeData(treeId: string): Observable<any[]> {
    return this.store.select(selectTreeData(treeId));
  }

  selectTreeInMemoryData(treeId: string): Observable<any[]> {
    return this.store.select(selectTreeInMemoryData(treeId));
  }
}
