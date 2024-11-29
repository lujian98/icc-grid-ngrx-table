import { createFeature, createReducer, on } from '@ngrx/store';
import * as treeActions from './tree.actions';
import { IccTreeConfig, TreeState, defaultTreeState } from '../models/tree-grid.model';

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
        treeId: key,
      };
      return { ...newState };
    }),
    on(treeActions.getTreeDataSuccess, (state, action) => {
      const key = action.treeId;
      const newState: TreeState = { ...state };
      if (state[key]) {
        const oldState = state[key];

        newState[key] = {
          ...oldState,
          data: [...action.treeData.data],
        };
      }
      console.log(' new load data setup tree data = ', newState);
      return { ...newState };
    }),
    on(treeActions.setTreeInMemoryData, (state, action) => {
      const key = action.treeId;
      const newState: TreeState = { ...state };
      //console.log(' old state=', state)
      if (state[key]) {
        newState[key] = {
          ...state[key],
          inMemoryData: action.treeData.data,
        };
      }
      console.log(' new load data setTreeInMemoryData tree data = ', newState);
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
