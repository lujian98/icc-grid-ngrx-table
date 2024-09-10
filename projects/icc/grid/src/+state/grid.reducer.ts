import { createFeature, createReducer, on } from '@ngrx/store';
import * as gridActions from './grid.actions';
import { IccGridState } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';
import { MIN_GRID_COLUMN_WIDTH, VIRTUAL_SCROLL_PAGE_SIZE } from '../models/constants';

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.initGridConfig, (state, action) => {
      const gridConfig = { ...action.gridConfig };
      const key = gridConfig.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...defaultState,
        gridConfig: {
          ...gridConfig,
          viewportReady: !gridConfig.remoteGridConfig && !gridConfig.remoteColumnsConfig,
          pageSize: !gridConfig.virtualScroll ? gridConfig.pageSize : VIRTUAL_SCROLL_PAGE_SIZE,
        },
      };
      return {
        ...newState,
      };
    }),

    on(gridActions.loadGridConfigSuccess, (state, action) => {
      const gridConfig = { ...action.gridConfig };
      const key = gridConfig.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...gridConfig,
          viewportReady: !action.gridConfig.remoteColumnsConfig,
        },
      };
      return {
        ...newState,
      };
    }),

    on(gridActions.loadGridColumnsConfigSuccess, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          viewportReady: true,
        },
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
      const key = action.gridConfig.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          pageSize: action.pageSize,
          viewportWidth: action.viewportWidth,
        },
      };
      //console.log(' bbbbbbbbbbbb setViewportPageSize=', newState);
      return {
        ...newState,
      };
    }),
    on(gridActions.setGridSortFields, (state, action) => {
      const key = action.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          sortFields: action.sortFields,
          page: 1,
        },
      };
      //console.log(' setGridSortField=', newState)
      return {
        ...newState,
      };
    }),

    on(gridActions.setGridColumnFilters, (state, action) => {
      const key = action.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          columnFilters: action.columnFilters,
          page: 1,
        },
      };
      //console.log(' setGridSortField=', newState)
      return {
        ...newState,
      };
    }),

    on(gridActions.setViewportPage, (state, action) => {
      const key = action.gridId;
      const newState: IccGridState = { ...state };
      newState[key] = {
        ...state[key],
        gridConfig: {
          ...state[key].gridConfig,
          page: action.page,
        },
      };
      return {
        ...newState,
      };
    }),
    on(gridActions.setGridColumnsConfig, (state, action) => {
      const key = action.gridId;
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
      const key = action.gridId;
      const newState: IccGridState = { ...state };
      //console.log(' old state=', state)
      const oldState = state[key];
      const gridConfig = oldState.gridConfig;
      const data =
        gridConfig.virtualScroll && gridConfig.page > 1
          ? [...oldState.data, ...action.gridData.data]
          : [...action.gridData.data];
      newState[key] = {
        ...oldState,
        gridConfig: {
          ...gridConfig,
          totalCounts: action.gridData.totalCounts,
        },
        totalCounts: action.gridData.totalCounts,
        data: data,
      };
      //console.log(' new load data setup grid data = ', newState);
      return {
        ...newState,
      };
    }),
    on(gridActions.setGridInMemoryData, (state, action) => {
      const key = action.gridId;
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
    on(gridActions.removeGridDataStore, (state, action) => {
      const key = action.gridId;
      const newState: IccGridState = { ...state };
      delete newState[key];
      //console.log(' remove grid data store = ', newState)
      return {
        ...newState,
      };
    }),
  ),
});
