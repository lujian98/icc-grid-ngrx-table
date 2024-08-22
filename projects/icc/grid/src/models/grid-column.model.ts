export const MIN_GRID_COLUMN_WIDTH = 100;

export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccGridConfig {
  gridName: string;
  urlKey?: string;
  remoteColumnsConfig: boolean,
  page: number;
  pageSize: number;
  viewportWidth: number;
  totalCounts: number;
  sortFields: IccSortField[],
  columnFilters: IccColumnFilter[],
  rowSelection: boolean;

  hasScrollY: boolean,
  columnReorder: boolean;
  columnResize: boolean;
}

export interface IccGridState {
  [key: string]: GridState;
}

export interface GridState<T extends object = object> {
  gridConfig: IccGridConfig;
  columnsConfig: IccColumnConfig[];
  data: T[];
  totalCounts: number;
}


export interface IccGridData<T> {
  data: T[];
  totalCounts: number;
}

export const defaultGridConfig: IccGridConfig = {
  gridName: 'test',
  remoteColumnsConfig: true,
  page: 1,
  pageSize: 20,
  viewportWidth: 1000,
  totalCounts: 0,
  sortFields: [],
  columnFilters: [],
  rowSelection: false,

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

export interface IccColumnWidth {
  name: string;
  width: number;
}

/*
export enum FilterType {
  Text = 'Text',
  Number = 'Number',
  Boolean = 'Boolean'
}
*/

export interface IccColumnFilter {
  name: string;
  //type: string;
  value: string | number | boolean; // string[] | number[];
}

export interface IccColumnConfig {
  name: string;
  title?: string;
  fieldType?: string; // | SunFieldType | SunTextFieldType | SunNumberFieldType | SunSelectFieldType;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  sortField?: boolean;
  filterField?: boolean;

  //field: string;
  //index?: number;
  //validations?: SunValidation[];

  //draggable?: boolean;
  //dateFormat?: string;
  //dateRangePreset?: boolean;
  /*
  header?: string;
  headerClass?: string;

  renderer?: SunRendererType;
  groupField?: SunGroupField;
  editField?: SunEditField;
  cellReadonly?: boolean | Function;
  priority?: number;
  menu?: boolean | SunMenuItem;
  groupHeader?: SunGroupHeader;
  copyToClipboard?: boolean;
  */
}
