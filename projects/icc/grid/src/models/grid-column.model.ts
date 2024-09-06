export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccGridConfig {
  gridName: string;
  urlKey?: string; // Only for remote. if not defined, use gridName
  columnSort: boolean;
  columnFilter: boolean;
  columnResize: boolean;
  columnReorder: boolean;
  columnMenu: boolean;
  columnHidden: boolean;
  remoteColumnsConfig: boolean;
  rowSelection: boolean;
  horizontalScroll: boolean;
  verticalScroll: boolean;
  virtualScroll: boolean;
  viewportWidth: number;
  viewReady: boolean; // NOT used
  sortFields: IccSortField[];
  columnFilters: IccColumnFilter[];
  page: number;
  pageSize: number;
  totalCounts: number;
  remoteGridData: boolean;
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

export type SunFilterField = boolean | string;

export interface IccColumnFilter {
  name: string;
  //type: string;
  value: string | number | boolean; // string[] | number[];
}

export type fieldType = 'text' | 'number' | 'select';

export interface SunFieldType {
  type: fieldType;
  allowBlank?: boolean;
}

export interface SunTextFieldType extends SunFieldType {
  minLength?: number;
  maxLength?: number;
}

export interface SunNumberFieldType extends SunFieldType {
  minValue?: number;
  maxValue?: number;
}

/*
export interface SunSelectOption {
  label: string;
  value: string | number;
  children?: SunSelectOption[];
  optionFields?: string[];
}*/

export interface SunSelectFieldType extends SunFieldType {
  key?: string;
  value?: string;
  options?: any[];
  multiSelect?: boolean;
  filterMultiSelect?: boolean;
  /*
  showCheckAll?: boolean;
  showUncheckAll?: boolean;
  showIsEmpty?: boolean;
  */
}

export interface IccColumnConfig {
  name: string;
  title?: string;
  fieldType?: string | SunFieldType | SunTextFieldType | SunNumberFieldType | SunSelectFieldType;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  sortField?: boolean;
  filterField?: SunFilterField;

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
