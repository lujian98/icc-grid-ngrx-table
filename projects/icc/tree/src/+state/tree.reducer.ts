import { createFeature, createReducer, on } from '@ngrx/store';
import * as treeActions from './tree.actions';
import { TreeState, defaultTreeState, IccTreeNode } from '../models/tree-grid.model';
import {
  iccFlattenTree,
  iccSetNestNodeId,
  iccNodeToggleInMemoryData,
  iccExpandAllNodesInMemoryData,
} from '../utils/nested-tree';

export function iccRemoveNode<T>(nodes: IccTreeNode<T>[], n: IccTreeNode<T>): IccTreeNode<T>[] {
  return [...nodes]
    .filter((node) => node.id !== n.id)
    .map((node) => {
      const children = node.children?.length ? iccRemoveNode(node.children, n) : undefined;
      return {
        ...node,
        children: children && children.length > 0 ? children : undefined,
      };
    });
}

export function iccAddNestedTreeNode<T>(
  nodes: IccTreeNode<T>[],
  n: IccTreeNode<T>,
  targetParent: IccTreeNode<T>,
  targetIndex: number,
): IccTreeNode<T>[] {
  if (!targetParent) {
    nodes.splice(targetIndex, 0, n);
    return [...nodes];
  } else {
    return [...nodes].map((node) => {
      let children = node.children;
      if (node.id === targetParent.id) {
        children = node.children ? node.children : [];
        children.splice(targetIndex, 0, n);
      }
      return {
        ...node,
        children: children ? iccAddNestedTreeNode(children, n, targetParent, targetIndex) : undefined,
      };
    });
  }
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
        const inMemoryData = iccSetNestNodeId([...action.treeData]);
        newState[key] = {
          ...oldState,
          inMemoryData,
          treeData: iccFlattenTree([...inMemoryData], 0),
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
          inMemoryData: iccSetNestNodeId([...action.treeData]),
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

    on(treeActions.dropNode, (state, action) => {
      const key = action.treeConfig.gridId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const nodes = iccRemoveNode([...oldState.inMemoryData], action.node);
        const inMemoryData = iccAddNestedTreeNode([...nodes], action.node, action.targetParent, action.targetIndex);
        //console.log(' get iccRemoveNode = ', inMemoryData);
        newState[key] = {
          ...oldState,
          inMemoryData,
          //inMemoryData: [...nodes],
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
