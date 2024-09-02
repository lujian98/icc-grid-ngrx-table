import { createFeature, createReducer, on } from '@ngrx/store';
import * as gridActions from './grid.actions';
import { IccGridState } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';
import { MIN_GRID_COLUMN_WIDTH } from '../models/constants';

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.setupGridConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...defaultState,
        gridConfig: action.gridConfig,
      };
      return {
        ...newState,
      };
    }),
    on(gridActions.setupGridColumnsConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        columnsConfig: action.columnsConfig.map((column) => {
          return {
            ...column,
            fieldType: column.fieldType || 'text',
            width: column.width || MIN_GRID_COLUMN_WIDTH,
          };
        }),
      };
      //console.log(' setupGridColumnConfigSuccess=', newState)
      return {
        ...newState,
      };
    }),
    on(gridActions.setViewportPageSize, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          pageSize: action.pageSize,
          viewportWidth: action.viewportWidth,
        },
      };
      return {
        ...newState,
      };
    }),
    on(gridActions.setGridSortFields, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          sortFields: action.sortFields,
        },
      };
      //console.log(' setGridSortField=', newState)
      return {
        ...newState,
      };
    }),

    on(gridActions.setGridColumnFilters, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          columnFilters: action.columnFilters,
        },
      };
      //console.log(' setGridSortField=', newState)
      return {
        ...newState,
      };
    }),

    on(gridActions.setViewportPage, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          page: action.page,
          viewReady: true,
        },
      };
      return {
        ...newState,
      };
    }),
    /*
    on(gridActions.setViewportScrollY, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {...state };
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
    on(gridActions.setGridColumnsConfig, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        columnsConfig: state[key].columnsConfig.map((column) => {
          if (column.name === action.columnsConfig.name) {
            return { ...action.columnsConfig };
          } else {
            return column;
          }
        }),
      };
      return {
        ...newState,
      };
    }),
    on(gridActions.getGridDataSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      //console.log(' old state=', state)
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          totalCounts: action.gridData.totalCounts,
        },
        totalCounts: action.gridData.totalCounts,
        data: action.gridData.data,
      };
      //console.log(' new load data setup grid data = ', newState)
      return {
        ...newState,
      };
    }),
    on(gridActions.setGridInMemoryData, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      //console.log(' old state=', state)
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          totalCounts: action.gridData.totalCounts,
        },
        totalCounts: action.gridData.totalCounts,
        inMemoryData: action.gridData.data,
      };
      //console.log(' new load data setup grid data = ', newState)
      return {
        ...newState,
      };
    }),
    on(gridActions.clearGridDataStore, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = { ...state };
      delete newState[key];
      return {
        ...newState,
      };
    }),
  ),
});
