import { createSelector } from '@ngrx/store';
import { TreeState, IccTreeConfig } from '../models/tree-grid.model';

//onst featureSelector = createFeatureSelector('iccTree');

export interface AppTreeState {
  iccTree: TreeState;
}

export const featureSelector = (state: AppTreeState) => state.iccTree;

export const selectTreeData = (treeConfig: IccTreeConfig) =>
  createSelector(featureSelector, (state: TreeState) => {
    const treeId = treeConfig.gridId;
    return state[treeId] ? state[treeId].treeData : [];
  });

export const selectTreeInMemoryData = (treeConfig: IccTreeConfig) =>
  createSelector(featureSelector, (state: TreeState) => {
    const treeId = treeConfig.gridId;
    return state[treeId] ? state[treeId].inMemoryData : [];
  });
