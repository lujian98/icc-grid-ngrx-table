import { createFeature, createReducer, on } from '@ngrx/store';
import * as treeActions from './tree.actions';
import { TreeState, defaultTreeState, iccFlattenTree, IccTreeNode } from '../models/tree-grid.model';

export function iccNodeToggle<T>(nodes: IccTreeNode<T>[], n: IccTreeNode<T>): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      expanded: node.name === n.name ? !node.expanded : node.expanded,
      children: node.children ? iccNodeToggle(node.children, n) : undefined,
    };
  });
}

export const initialState: TreeState = {};

export const iccTreeFeature = createFeature({
  name: 'iccTree',
  reducer: createReducer(
    initialState,
    on(treeActions.initTreeConfig, (state, action) => {
      const treeConfig = { ...action.treeConfig };
      const key = treeConfig.gridId;
      const newState: TreeState = { ...state };
      newState[key] = {
        ...defaultTreeState,
        treeConfig,
      };
      return { ...newState };
    }),

    on(treeActions.getTreeDataSuccess, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const treeData = action.treeConfig.remoteGridData
          ? iccFlattenTree([...action.treeData], 0)
          : [...action.treeData];
        const remoteData = action.treeConfig.remoteGridData ? [...action.treeData] : [];
        newState[key] = {
          ...oldState,
          treeData,
          remoteData,
        };
      }
      console.log(' get gggggg new load data setup tree data = ', newState);
      return { ...newState };
    }),

    on(treeActions.setTreeInMemoryData, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      //console.log(' old state=', state)
      if (state[key]) {
        newState[key] = {
          ...state[key],
          inMemoryData: [...action.treeData],
        };
      }
      console.log(' ssssssssssss new load data setTreeInMemoryData tree data = ', newState);
      return { ...newState };
    }),

    on(treeActions.nodeToggle, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        newState[key] = {
          ...oldState,
          inMemoryData: iccNodeToggle(oldState.inMemoryData, action.node),
        };
      }
      return { ...newState };
    }),

    on(treeActions.removeTreeDataStore, (state, action) => {
      const key = action.treeId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
