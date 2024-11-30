import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as treeActions from './tree.actions';
import { selectTreeData, selectTreeInMemoryData } from './tree.selectors';
import { IccTreeConfig, IccTreeNode } from '../models/tree-grid.model';

@Injectable()
export class IccTreeFacade {
  private store = inject(Store);

  initTreeConfig(treeConfig: IccTreeConfig): void {
    this.store.dispatch(treeActions.initTreeConfig({ treeConfig }));
  }

  viewportReadyLoadData(treeConfig: IccTreeConfig): void {
    if (treeConfig.viewportReady) {
      this.getTreeData(treeConfig);
    }
  }

  /*


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

  getTreeData(treeConfig: IccTreeConfig): void {
    //console.log( ' 1111 get tree data=', treeConfig)
    if (treeConfig.remoteGridData) {
      this.store.dispatch(treeActions.getTreeRemoteData({ treeConfig }));
    } else {
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeConfig }));
    }
  }

  nodeToggle<T>(treeConfig: IccTreeConfig, node: IccTreeNode<T>): void {
    if (treeConfig.remoteGridData && !treeConfig.remoteLoadAll) {
      // TODO remove data need call a service to add/remove child
    } else {
      this.store.dispatch(treeActions.nodeToggleInMemoryData({ treeConfig, node }));
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeConfig }));
    }
  }

  /*
  setTreeData<T>(treeConfig: IccTreeConfig, treeData: IccTreeNode<T>[]): void {
    this.store.dispatch(treeActions.getTreeRemoteDataSuccess({ treeConfig, treeData }));
  }*/

  setTreeInMemoryData<T>(treeConfig: IccTreeConfig, treeData: IccTreeNode<T>[]): void {
    this.store.dispatch(treeActions.setTreeInMemoryData({ treeConfig, treeData }));
    this.getTreeData(treeConfig);
  }

  clearTreeDataStore(treeId: string): void {
    this.store.dispatch(treeActions.clearTreeDataStore({ treeId }));
  }

  selectTreeData<T>(treeConfig: IccTreeConfig): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeData(treeConfig));
  }

  /*
  selectTreeRemoteData<T>(treeConfig: IccTreeConfig): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeRemoteData(treeConfig));
  }
  */

  selectTreeInMemoryData<T>(treeConfig: IccTreeConfig): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeInMemoryData(treeConfig));
  }
}
