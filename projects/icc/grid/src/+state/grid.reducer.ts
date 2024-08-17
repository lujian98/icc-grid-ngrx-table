import { createFeature, createReducer, on } from '@ngrx/store';

import * as gridActions from './grid.actions';
import { IccGridState, defaultState } from '../models/grid-column.model';

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.setupGridConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...defaultState,
        gridConfig: action.gridConfig,
      };
      //console.log( ' setup config state = ', newState)
      return {
        ...newState,
      }
    }),

    on(gridActions.setupGridColumnConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        columnConfig: action.columnConfig,
      };
      //console.log( ' setup column config state = ', newState)
      return {
        ...newState,
      }
    }),

    on(gridActions.setViewportPageSize, (state, action) => {
      //console.log( ' i999 action=', action)
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          pageSize: action.pageSize,
        }
      };
      //console.log( ' setup pageSize state = ', newState)
      return {
        ...newState,
      }
    }),

    on(gridActions.setGridSortField, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          sortFields: action.sortFields,
        }
      };
      return {
        ...newState,
      }
    }),

    on(gridActions.setViewportPage, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          page: action.page,
        }
      };
      return {
        ...newState,
      }
    }),

    on(gridActions.getGridDataSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          totalCounts: action.gridData.totalCounts,
        },
        totalCounts: action.gridData.totalCounts,
        data: action.gridData.data,
      };
      console.log( ' load data setup grid data = ', newState)
      return {
        ...newState,
      }
    }),

  ),
});
