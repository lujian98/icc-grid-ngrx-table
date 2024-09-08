import { IccGridConfig, GridState } from './grid-column.model';

export const defaultGridConfig: IccGridConfig = {
  gridId: '191cf2bb6b8', // auto generated unique id
  urlKey: 'grid', // Only for remote grid config and data
  columnSort: false,
  columnFilter: false,
  columnResize: false,
  columnReorder: false,
  columnMenu: false,
  columnHidden: false,
  remoteColumnsConfig: false,
  rowSelection: false,
  horizontalScroll: false,
  verticalScroll: false,
  virtualScroll: false,
  viewportWidth: 1000,
  viewReady: false,
  sortFields: [],
  columnFilters: [],
  page: 1,
  pageSize: 10,
  totalCounts: 0,
  remoteGridData: false,
};

export const defaultState: GridState = {
  gridConfig: defaultGridConfig,
  columnsConfig: [],
  data: [],
  totalCounts: 0,
  inMemoryData: [],
};
