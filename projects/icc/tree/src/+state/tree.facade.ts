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

  initTreeConfig(treeConfig: IccTreeConfig): void {
    this.store.dispatch(treeActions.initTreeConfig({ treeConfig }));
  }

  viewportReadyLoadData(treeConfig: IccTreeConfig, gridSetting: IccGridSetting): void {
    if (gridSetting.viewportReady) {
      this.getTreeData(treeConfig);
    }
  }

  windowResizeLoadData(treeConfig: IccTreeConfig, gridSetting: IccGridSetting): void {
    if (gridSetting.viewportReady) {
      this.store.dispatch(treeActions.getConcatTreeData({ treeConfig }));
    }
  }

  getTreeData(treeConfig: IccTreeConfig): void {
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

  expandAllNodes<T>(treeConfig: IccTreeConfig, expanded: boolean): void {
    if (treeConfig.remoteGridData && !treeConfig.remoteLoadAll) {
      // TODO remove data need call a service to add/remove child
    } else {
      this.store.dispatch(treeActions.expandAllNodesInMemoryData({ treeConfig, expanded }));
      this.store.dispatch(treeActions.getTreeInMemoryData({ treeConfig }));
    }
  }

  dropNode<T>(
    treeConfig: IccTreeConfig,
    node: IccTreeNode<T>,
    targetParent: IccTreeNode<T>,
    targetIndex: number,
  ): void {
    this.store.dispatch(treeActions.dropNode({ treeConfig, node, targetParent, targetIndex }));
    this.store.dispatch(treeActions.getTreeInMemoryData({ treeConfig }));
    //TODO remote update node
  }

  setTreeInMemoryData<T>(treeConfig: IccTreeConfig, treeData: IccTreeNode<T>[]): void {
    this.store.dispatch(treeActions.setTreeInMemoryData({ treeConfig, treeData }));
  }

  clearTreeDataStore(treeId: string): void {
    this.store.dispatch(treeActions.clearTreeDataStore({ treeId }));
  }

  selectTreeData<T>(treeConfig: IccTreeConfig): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeData(treeConfig));
  }

  selectTreeInMemoryData<T>(treeConfig: IccTreeConfig): Observable<IccTreeNode<T>[]> {
    return this.store.select(selectTreeInMemoryData(treeConfig));
  }
}
