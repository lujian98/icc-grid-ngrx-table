import { createFeature, createReducer, on } from '@ngrx/store';
import * as gridActions from './grid.actions';
import { GridState, IccColumnConfig } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import { MIN_GRID_COLUMN_WIDTH, VIRTUAL_SCROLL_PAGE_SIZE } from '../models/constants';

function getRowGroupData(column: IccColumnConfig, data: any[]): any[] {
  const groupByColumns = [
    {
      column: column.name,
      field: column.name,
    },
  ];
  const rowGroups = new IccRowGroups();
  rowGroups.groupByColumns = groupByColumns;
  //console.log('eeeeeeee data=', data)
  const groupedData = rowGroups.getGroupData(data);
  console.log('ffffffffffffff groupedData=', groupedData);
  return groupedData;
}

export const initialState: GridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.initGridConfig, (state, action) => {
      const gridConfig = { ...action.gridConfig };
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
      const gridConfig = { ...action.gridConfig };
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
      }
      //console.log(' setupGridColumnConfigSuccess=', newState)
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
      //console.log(' bbbbbbbbbbbb setViewportPageSize=', newState);
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
      //console.log(' setGridSortField=', newState)
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
      //console.log(' setGridSortField=', newState)
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
      }
      //console.log(' new load data setup grid data = ', newState);
      return { ...newState };
    }),
    on(gridActions.setGridInMemoryData, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      //console.log(' old state=', state)
      if (state[key]) {
        newState[key] = {
          ...state[key],
          gridConfig: {
            ...state[key].gridConfig,
            totalCounts: action.gridData.totalCounts,
          },
          totalCounts: action.gridData.totalCounts,
          //data: action.gridData.data,
          inMemoryData: action.gridData.data,
        };
      }
      //console.log(' new load data setup grid data = ', newState)
      return { ...newState };
    }),

    on(gridActions.setGridGroupBy, (state, action) => {
      const key = action.gridConfig.gridId;
      const newState: GridState = { ...state };
      //console.log( ' action =', action)
      if (state[key]) {
        const oldState = state[key];
        const data = getRowGroupData(action.columnsConfig, oldState.data);

        const total = oldState.totalCounts + data.length;
        newState[key] = {
          ...oldState,
          gridConfig: {
            ...oldState.gridConfig,
            totalCounts: total,
          },
          totalCounts: total,
          data: data,
        };
      }
      //console.log(' new load data setup grid data = ', newState);
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
