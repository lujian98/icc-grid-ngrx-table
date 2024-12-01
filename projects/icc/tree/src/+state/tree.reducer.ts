import { createFeature, createReducer, on } from '@ngrx/store';
import * as treeActions from './tree.actions';
import { TreeState, defaultTreeState, iccFlattenTree, IccTreeNode } from '../models/tree-grid.model';

export function iccNodeToggleInMemoryData<T>(nodes: IccTreeNode<T>[], n: IccTreeNode<T>): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      expanded: node.name === n.name ? !node.expanded : node.expanded,
      children: node.children ? iccNodeToggleInMemoryData(node.children, n) : undefined,
    };
  });
}

export function iccExpandAllNodesInMemoryData<T>(nodes: IccTreeNode<T>[], expanded: boolean): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      expanded: node.children ? expanded : undefined,
      children: node.children ? iccExpandAllNodesInMemoryData(node.children, expanded) : undefined,
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

    on(treeActions.getTreeRemoteDataSuccess, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        newState[key] = {
          ...oldState,
          treeData: iccFlattenTree([...action.treeData], 0),
          //remoteData: [...action.treeData],
          inMemoryData: [...action.treeData],
        };
      }
      console.log('get new load remote data= ', newState);
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
      console.log(' set InMemoryData tree data = ', newState);
      return { ...newState };
    }),

    on(treeActions.getInMemoryTreeDataSuccess, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state }; // treeData is faltten and filter
      if (state[key]) {
        const oldState = state[key];
        newState[key] = {
          ...oldState,
          treeData: [...action.treeData],
        };
      }
      console.log(' get InMemoryData = ', newState);
      return { ...newState };
    }),

    on(treeActions.nodeToggleInMemoryData, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        newState[key] = {
          ...oldState,
          inMemoryData: iccNodeToggleInMemoryData(oldState.inMemoryData, action.node),
        };
      }
      return { ...newState };
    }),

    on(treeActions.expandAllNodesInMemoryData, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        newState[key] = {
          ...oldState,
          inMemoryData: iccExpandAllNodesInMemoryData(oldState.inMemoryData, action.expanded),
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
