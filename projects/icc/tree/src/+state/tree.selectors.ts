import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TreeState } from '../models/tree-grid.model';

const featureSelector = createFeatureSelector('iccTree');

export const selectTreeData = (treeId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: TreeState) => {
      return state[treeId] ? state[treeId].data : [];
    },
  );

export const selectTreeInMemoryData = (treeId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: TreeState) => {
      return state[treeId] ? state[treeId].inMemoryData : [];
    },
  );
