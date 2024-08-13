import { createFeature, createReducer, on } from '@ngrx/store';

import * as gridActions from './grid.actions'
import { IccColumnConfig } from '../models/grid-column.model';

export interface IccGridState {
  [key: string]: GridState;
}

export interface IccGridConfig {
  rowSelection: boolean;
  columnReorder: boolean;
  columnResize: boolean;
}

export interface GridState<T extends object = object> {
  gridConfig: IccGridConfig;
  columnConfig: IccColumnConfig[];
  data: T[];
  TotalCounts: number;
}

export const setupState: GridState = {
  gridConfig: {
    rowSelection: false,
    columnReorder: false,
    columnResize: false,
  },
  columnConfig: [],
  data: [],
  TotalCounts: 0,
}

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.setupGridConfig, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = setupState;
      console.log( ' setup config state = ', newState)
      return {
        ...newState,
      }
    }),

    on(gridActions.setupGridColumnConfig, (state, action) => {
      const key = action.gridName;
      const gridState: GridState = {
        ...state[key],
        columnConfig: action.columnConfig,
      };
      gridState.columnConfig = action.columnConfig;
      const newState: IccGridState = {};
      newState[key] = gridState;
      console.log( ' setup column config state = ', newState)
      return {
        ...newState,
      }
    }),
  ),
});
