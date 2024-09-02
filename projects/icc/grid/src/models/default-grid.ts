import { IccGridConfig, GridState } from './grid-column.model';

export const defaultGridConfig: IccGridConfig = {
  gridName: 'icc-grid',
  columnSort: false,
  columnFilter: false,
  columnResize: false,
  columnReorder: false,
  columnMenu: false,
  columnHidden: false,
  remoteColumnsConfig: false,
  rowSelection: false,
  horizontalScroll: false,
  fitVertical: true,
  viewportWidth: 1000,
  viewReady: false,
  sortFields: [],
  columnFilters: [],
  page: 1,
  pageSize: 20,
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
