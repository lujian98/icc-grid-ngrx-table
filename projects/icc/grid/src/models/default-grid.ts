
import { IccGridConfig, GridState } from './grid-column.model';

export const defaultGridConfig: IccGridConfig = {
  gridName: 'icc-grid',
  columnSort: false,
  columnFilter: false,
  columnResize: false,
  columnReorder: false,
  columnMenu: false,
  columnHidden: false,

  rowSelection: false,

  remoteColumnsConfig: false,
  remoteGridData: true,
  page: 1,
  pageSize: 20,
  viewportWidth: 1000,
  totalCounts: 0,
  sortFields: [],
  columnFilters: [],


  hasScrollY: false,
}

export const defaultState: GridState = {
  gridConfig: defaultGridConfig,
  columnsConfig: [],
  data: [],
  totalCounts: 0,
}
