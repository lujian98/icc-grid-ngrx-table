import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TreeState, IccTreeConfig } from '../models/tree-grid.model';

const featureSelector = createFeatureSelector('iccTree');

export const selectTreeData = (treeConfig: IccTreeConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: TreeState) => {
      const treeId = treeConfig.gridId;
      return state[treeId] ? state[treeId].treeData : [];
    },
  );

export const selectTreeInMemoryData = (treeConfig: IccTreeConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: TreeState) => {
      const treeId = treeConfig.gridId;
      return state[treeId] ? state[treeId].inMemoryData : [];
    },
  );
