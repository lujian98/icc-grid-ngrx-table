import { createSelector } from '@ngrx/store';
import { TreeState } from '../models/tree-grid.model';

export interface AppTreeState {
  iccTree: TreeState;
}

export const featureSelector = (state: AppTreeState) => state.iccTree;

export const selectTreeData = (treeId: string) =>
  createSelector(featureSelector, (state: TreeState) => {
    return state && state[treeId] ? state[treeId].treeData : [];
  });

export const selectTreeInMemoryData = (treeId: string) =>
  createSelector(featureSelector, (state: TreeState) => {
    return state && state[treeId] ? state[treeId].inMemoryData : [];
  });
