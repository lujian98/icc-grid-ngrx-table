import { createAction, props } from '@ngrx/store';
import { IccTreeConfig, IccTreeData } from '../models/tree-grid.model';

export const initTreeConfig = createAction('[Tree] Init Tree Config', props<{ treeConfig: IccTreeConfig }>());

export const getTreeRemoteData = createAction('[Tree] Get Tree Data', props<{ treeConfig: IccTreeConfig }>());

export const getConcatTreeData = createAction('[Tree] Get Concat Tree Data', props<{ treeConfig: IccTreeConfig }>());

export const getTreeRemoteDataSuccess = createAction(
  '[Tree] Get Tree Remote Data Success',
  props<{ treeConfig: IccTreeConfig; treeData: IccTreeData[] }>(),
);

export const setTreeInMemoryData = createAction(
  '[Tree] Get Tree In Memory Data',
  props<{ treeConfig: IccTreeConfig; treeData: IccTreeData[] }>(),
);

export const getTreeInMemoryData = createAction(
  '[Tree] Get Tree InMemoryData Data',
  props<{ treeConfig: IccTreeConfig }>(),
);

export const getInMemoryTreeDataSuccess = createAction(
  '[Tree] Get Tree InMemory Data Success',
  props<{ treeConfig: IccTreeConfig; treeData: IccTreeData[] }>(),
);

export const nodeToggleInMemoryData = createAction(
  '[Tree] Node Toggle InMemoryData',
  props<{ treeConfig: IccTreeConfig; node: IccTreeData }>(),
);

export const expandAllNodesInMemoryData = createAction(
  '[Tree] Expand All Nodes InMemoryData',
  props<{ treeConfig: IccTreeConfig; expanded: boolean }>(),
);

export const dropNode = createAction(
  '[Tree] Node Toggle dropNode',
  props<{ treeConfig: IccTreeConfig; node: IccTreeData; targetParent: IccTreeData; targetIndex: number }>(),
);

export const clearTreeDataStore = createAction('[Tree] Clear Tree Data Store', props<{ treeId: string }>());
export const removeTreeDataStore = createAction('[Tree] Remove Tree Data Store', props<{ treeId: string }>());
