
import { IccGridConfig, GridState } from './grid-column.model';

export const defaultGridConfig: IccGridConfig = {
  gridName: 'test',
  enableSort: false,
  enableFilter: false,
  rowSelection: false,

  remoteColumnsConfig: true,
  remoteGridData: true,
  page: 1,
  pageSize: 20,
  viewportWidth: 1000,
  totalCounts: 0,
  sortFields: [],
  columnFilters: [],


  hasScrollY: false,
  columnReorder: false,
  columnResize: false,
}

export const defaultState: GridState = {
  gridConfig: defaultGridConfig,
  columnsConfig: [],
  data: [],
  totalCounts: 0,
}
