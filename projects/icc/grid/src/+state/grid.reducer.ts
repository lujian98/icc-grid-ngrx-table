import { createFeature, createReducer, on } from '@ngrx/store';
import { MIN_GRID_COLUMN_WIDTH, VIRTUAL_SCROLL_PAGE_SIZE } from '../models/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { defaultState } from '../models/default-grid';
import { GridState } from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import * as gridActions from './grid.actions';

export const initialState: GridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.initGridConfig, (state, action) => {
      const gridConfig = {
        ...action.gridConfig,
        //virtualScroll: action.gridConfig.virtualScroll || action.gridConfig.rowGroup,
      };
      const key = gridConfig.gridId;
      const newState: GridState = { ...state };
      newState[key] = {
        ...defaultState,
        gridConfig: {
          ...gridConfig,
          viewportReady: !gridConfig.remoteGridConfig && !gridConfig.remoteColumnsConfig,
          pageSize: !gridConfig.virtualScroll ? gridConfig.pageSize : VIRTUAL_SCROLL_PAGE_SIZE,
        },
      };
      return { ...newState };
    }),
    on(gridActions.loadGridConfigSuccess, (state, action) => {
      const gridConfig = {
        ...action.gridConfig,
        //virtualScroll: action.gridConfig.virtualScroll || action.gridConfig.rowGroup,
      };
      const key = gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...gridConfig,
            viewportReady: !action.gridConfig.remoteColumnsConfig,
          },
        };
        const pageSize = newState[key].gridConfig.pageSize;
        if (gridConfig.virtualScroll && pageSize < VIRTUAL_SCROLL_PAGE_SIZE) {
          newState[key].gridConfig.pageSize = VIRTUAL_SCROLL_PAGE_SIZE;
        }
      }
      return { ...newState };
    }),
    on(gridActions.loadGridColumnsConfigSuccess, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        const gridConfig = {
          ...state[key].gridConfig,
          viewportReady: true,
        };
        newState[key] = {
          ...state[key],
          gridConfig,
          columnsConfig: action.columnsConfig.map((column) => {
            return {
              ...column,
              fieldType: column.fieldType || 'text',
              width: column.width || MIN_GRID_COLUMN_WIDTH,
            };
          }),
          selection: gridConfig.multiRowSelection ? new SelectionModel<any>(true, []) : state[key].selection,
        };
      }
      return { ...newState };
    }),
    on(gridActions.setViewportPageSize, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            pageSize: action.pageSize,
            viewportWidth: action.viewportWidth,
          },
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridSortFields, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            sortFields: action.sortFields,
            page: 1,
          },
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridColumnFilters, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            columnFilters: action.columnFilters,
            page: 1,
          },
        };
      }
      return { ...newState };
    }),
    on(gridActions.setViewportPage, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            page: action.page,
          },
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridColumnsConfig, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
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
      }
      return { ...newState };
    }),
    on(gridActions.getGridDataSuccess, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const gridConfig = oldState.gridConfig;

        let queryData = gridConfig.rowGroupField && oldState.rowGroups ? [...oldState.queryData] : [...oldState.data];
        let data =
          gridConfig.virtualScroll && gridConfig.page > 1
            ? [...queryData, ...action.gridData.data]
            : [...action.gridData.data];

        let totalCounts = action.gridData.totalCounts;

        if (gridConfig.rowGroupField && oldState.rowGroups) {
          queryData = [...data];
          data = oldState.rowGroups.getRowGroups(data);
          const groups = [...data].filter((record) => record instanceof IccRowGroup);
          totalCounts += groups.length;
        }

        newState[key] = {
          ...oldState,
          gridConfig: {
            ...gridConfig,
            totalCounts: totalCounts,
          },
          totalCounts: totalCounts,
          data,
          queryData,
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridInMemoryData, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            totalCounts: action.gridData.totalCounts,
          },
          totalCounts: action.gridData.totalCounts,
          inMemoryData: action.gridData.data,
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridGroupBy, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const rowGroups = new IccRowGroups();
        rowGroups.rowGroupFields = [action.rowGroupField];
        newState[key] = {
          ...oldState,
          rowGroups,
          gridConfig: {
            ...oldState.gridConfig,
            rowGroupField: action.rowGroupField,
          },
          queryData: [...oldState.data],
        };
      }
      return { ...newState };
    }),
    on(gridActions.setToggleRowGroup, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const queryData = [...oldState.queryData];
        const data = oldState.rowGroups!.getRowGroups(queryData);
        const groups = [...data].filter((record) => record instanceof IccRowGroup);
        const totalCounts = queryData.length + groups.length;

        newState[key] = {
          ...oldState,
          gridConfig: {
            ...oldState.gridConfig,
            totalCounts: totalCounts,
          },
          totalCounts: totalCounts,
          data,
        };
      }
      return { ...newState };
    }),
    on(gridActions.setGridUnGroupBy, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const groups = [...oldState.data].filter((record) => record instanceof IccRowGroup);
        const data = [...oldState.queryData];
        const total = oldState.totalCounts - groups.length;
        newState[key] = {
          ...oldState,
          rowGroups: undefined,
          gridConfig: {
            ...oldState.gridConfig,
            rowGroupField: undefined,
            totalCounts: total,
          },
          totalCounts: total,
          data: data,
          queryData: [],
        };
      }
      return { ...newState };
    }),

    on(gridActions.removeGridDataStore, (state, action) => {
      const key = action.gridId;
      const newState: GridState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
