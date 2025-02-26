import { SelectionModel } from '@angular/cdk/collections';
import { IccGridConfig, IccGridState, IccGridSetting } from './grid-column.model';

export const defaultGridConfig: IccGridConfig = {
  gridId: '191cf2bb6b8', // auto generated unique id internal use
  isTreeGrid: false,
  urlKey: 'grid', // Only for remote grid config and data
  viewportReady: false, // internal use
  columnSort: false,
  columnFilter: false,
  columnResize: false,
  columnReorder: false,
  columnMenu: false,
  gridEditable: false,
  recordKey: 'id',
  restEdit: false,
  recordModified: false,
  columnHidden: false,
  remoteGridConfig: false,
  remoteColumnsConfig: false,
  rowSelection: false,
  multiRowSelection: false,
  rowGroup: false,
  groupHeader: false,
  horizontalScroll: false,
  verticalScroll: false,
  virtualScroll: false,
  viewportWidth: 1000, // internal use
  sortFields: [],
  columnFilters: [],
  page: 1,
  pageSize: 10,
  totalCounts: 0,
  remoteGridData: false,
  hideTopbar: false,
  hideGridFooter: false,
  rowHeight: 24, //px
  headerHeight: 30, //px
  refreshRate: 0, //seconds  min 5 seconds to have refresh the grid data
};

export const defaultGridSetting: IccGridSetting = {
  viewportReady: false,
  viewportWidth: 1000,
  lastUpdateTime: new Date(),
  gridEditable: false,
  restEdit: false,
  recordModified: false,
  pageSize: 10,
  totalCounts: 0,
};

export const defaultState: IccGridState = {
  gridConfig: defaultGridConfig,
  gridSetting: defaultGridSetting,
  columnsConfig: [],
  data: [],
  totalCounts: 0,
  inMemoryData: [],
  queryData: [],
  rowGroups: undefined,
  selection: new SelectionModel<object>(false, []),
  modified: [],
};
