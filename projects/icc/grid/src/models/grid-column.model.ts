export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccGridConfig {
  gridName: string;
  urlKey?: string;
  columnSort: boolean;
  columnFilter: boolean;
  columnResize: boolean;
  columnReorder: boolean;
  columnMenu: boolean;
  columnHidden: boolean;
  remoteColumnsConfig: boolean;
  rowSelection: boolean;
  sortFields: IccSortField[];
  columnFilters: IccColumnFilter[];
  page: number;
  pageSize: number;
  totalCounts: number;
  remoteGridData: boolean;

  viewportWidth: number;
  hasScrollY: boolean,
}

export interface IccGridState {
  [key: string]: GridState;
}

export interface GridState<T extends object = object> {
  gridConfig: IccGridConfig;
  columnsConfig: IccColumnConfig[];
  data: T[];
  totalCounts: number;
  inMemoryData: T[];
}


export interface IccGridData<T> {
  data: T[];
  totalCounts: number;
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
