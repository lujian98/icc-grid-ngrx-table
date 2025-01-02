import { Type } from '@angular/core';

export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccGridConfig {
  gridId: string; // auto generated unique id internal use
  isTreeGrid: boolean;
  urlKey: string; // Only for remote grid config and data
  viewportReady: boolean; // internal use
  columnSort: boolean;
  columnFilter: boolean;
  columnResize: boolean;
  columnReorder: boolean;
  columnMenu: boolean;
  columnHidden: boolean;
  remoteGridConfig: boolean;
  remoteColumnsConfig: boolean;
  rowSelection: boolean;
  horizontalScroll: boolean;
  verticalScroll: boolean;
  virtualScroll: boolean;
  viewportWidth: number; // internal use
  sortFields: IccSortField[];
  columnFilters: IccColumnFilter[];
  page: number;
  pageSize: number;
  totalCounts: number;
  remoteGridData: boolean;
  hideTopbar: boolean;
  hideGridFooter: boolean;
  rowHeight: number;
}

export enum IccRendererType {
  Text = 'Text',
  Image = 'Image',
}

export interface GridState {
  [key: string]: IccGridState;
}

export interface IccGridState<T extends object = object> {
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

export interface IccColumnFilter {
  name: string;
  //type: string;
  value: any; //string | number | boolean; // string[] | number[];
}

export type IccFilterField = boolean | string;

/*
export enum FilterType {
  Text = 'Text',
  Number = 'Number',
  Boolean = 'Boolean'
}
*/

/*




export type fieldType = 'text' | 'number' | 'select';

export interface IccFieldType {
  type: fieldType;
  allowBlank?: boolean;
}

export interface IccTextFieldType extends IccFieldType {
  minLength?: number;
  maxLength?: number;
}

export interface IccNumberFieldType extends IccFieldType {
  minValue?: number;
  maxValue?: number;
}


export interface IccSelectFieldType extends IccFieldType {
  key?: string;
  value?: string;
  options?: any[];
  multiSelect?: boolean;
  filterMultiSelect?: boolean;

  //showCheckAll?: boolean;
  //showUncheckAll?: boolean;
  //showIsEmpty?: boolean;
}
  */

export interface IccColumnConfig {
  name: string;
  title?: string;
  fieldType?: string; // | IccFieldType | IccTextFieldType | IccNumberFieldType | IccSelectFieldType;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  sortField?: boolean;
  filterField?: IccFilterField;
  rendererType?: IccRendererType;
  component?: Type<unknown>;
  renderer?: Function;

  //field: string;
  //index?: number;
  //validations?: IccValidation[];

  //draggable?: boolean;
  //dateFormat?: string;
  //dateRangePreset?: boolean;
  /*
  header?: string;
  headerClass?: string;

  renderer?: IccRendererType;
  groupField?: IccGroupField;
  editField?: IccEditField;
  cellReadonly?: boolean | Function;
  priority?: number;
  menu?: boolean | IccMenuItem;
  groupHeader?: IccGroupHeader;
  copyToClipboard?: boolean;
  */
}

export interface ColumnMenuClick {
  column: IccColumnConfig;
  event: MouseEvent;
}
