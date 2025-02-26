import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccColumnConfig, IccGridFacade, IccGridStateModule, IccGridSetting } from '@icc/ui/grid';
import * as treeActions from './tree.actions';
import { selectTreeData, selectTreeInMemoryData } from './tree.selectors';
import { IccTreeConfig, IccTreeNode } from '../models/tree-grid.model';

@Injectable()
export class IccTreeFacade {
  private store = inject(Store);

  initTreeConfig(treeId: string, treeConfig: IccTreeConfig): void {
    this.store.dispatch(treeActions.initTreeConfig({ treeId, treeConfig }));
  }

  viewportReadyLoadData(treeId: string, treeConfig: IccTreeConfig, gridSetting: IccGridSetting): void {
    if (gridSetting.viewportReady) {
      this.getTreeData(treeId, treeConfig);
    }
  }

  windowResizeLoadData(treeId: string, treeConfig: IccTreeConfig, gridSetting: IccGridSetting): void {
    if (gridSetting.viewportReady) {
      this.store.dispatch(treeActions.getConcatTreeData({ treeId, treeConfig }));
    }
  }

  getTreeData(treeId: string, treeConfig: IccTreeConfig): void {
    if (treeConfig.remoteGridData) {
      this.store.dispatch(treeActions.getTreeRemoteData({ treeId, treeConfig }));
    } else {
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeId, treeConfig }));
    }
  }

  nodeToggle<T>(treeId: string, treeConfig: IccTreeConfig, node: IccTreeNode<T>): void {
    if (treeConfig.remoteGridData && !treeConfig.remoteLoadAll) {
      // TODO remove data need call a service to add/remove child
    } else {
      this.store.dispatch(treeActions.nodeToggleInMemoryData({ treeId, treeConfig, node }));
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeId, treeConfig }));
    }
  }

  expandAllNodes<T>(treeId: string, treeConfig: IccTreeConfig, expanded: boolean): void {
    if (treeConfig.remoteGridData && !treeConfig.remoteLoadAll) {
      // TODO remove data need call a service to add/remove child
    } else {
      this.store.dispatch(treeActions.expandAllNodesInMemoryData({ treeId, treeConfig, expanded }));
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeId, treeConfig }));
    }
  }

  dropNode<T>(
    treeId: string,
    treeConfig: IccTreeConfig,
    node: IccTreeNode<T>,
    targetParent: IccTreeNode<T>,
    targetIndex: number,
  ): void {
    this.store.dispatch(treeActions.dropNode({ treeId, treeConfig, node, targetParent, targetIndex }));
    this.store.dispatch(treeActions.getTreeInMemoryData({ treeId, treeConfig }));
    //TODO remote update node
  }

  setTreeInMemoryData<T>(treeId: string, treeConfig: IccTreeConfig, treeData: IccTreeNode<T>[]): void {
    this.store.dispatch(treeActions.setTreeInMemoryData({ treeId, treeConfig, treeData }));
  }

  clearTreeDataStore(treeId: string): void {
    this.store.dispatch(treeActions.clearTreeDataStore({ treeId }));
  }

  selectTreeData<T>(treeId: string): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeData(treeId));
  }

  selectTreeInMemoryData<T>(treeId: string): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeInMemoryData(treeId));
  }
}
