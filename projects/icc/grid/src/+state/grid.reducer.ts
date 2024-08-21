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
      return {
        ...newState,
      }
    }),
    on(gridActions.setupGridColumnsConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        columnConfig: action.columnConfig.map((column) => {
          return {
            ...column,
            width: column.width || 100,
          }
        }),
      };
      //console.log(' setupGridColumnConfigSuccess=', newState)
      return {
        ...newState,
      }
    }),
    on(gridActions.setViewportPageSize, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          pageSize: action.pageSize,
          viewportWidth: action.viewportWidth,
        }
      };
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
      //console.log(' setGridSortField=', newState)
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
    /*
    on(gridActions.setViewportScrollY, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          hasScrollY: action.hasScrollY,
          //page: 1,
        }
      };
      return {
        ...newState,
      }
    }),*/
    on(gridActions.setGridColumnConfig, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        columnConfig: state[key].columnConfig.map((column) => {
          if (column.name === action.columnConfig.name) {
            return {...action.columnConfig}
          } else {
            return column;
          }
        })
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
      //console.log(' load data setup grid data = ', newState)
      return {
        ...newState,
      }
    }),
  ),
});
