import { Type } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IccObjectType } from '@icc/ui/core';
import { IccRowGroups } from '../services/row-group/row-groups';
import { IccFieldConfig, IccDateRange } from '@icc/ui/fields';

export interface IccCellEdit<T> {
  recordKey: string;
  recordId: string;
  field: string;
  value: T;
  originalValue: T;
  changed: boolean;
}

export interface IccGridCell<T> {
  gridConfig: IccGridConfig;
  rowIndex: number;
  column: IccColumnConfig;
  record: T;
}

export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccRowGroupField {
  field: string;
  dir: string;
}

export interface IccGroupHeader {
  name: string;
  title?: string;
  field?: string;
  isGroupHeader?: boolean;
}

export interface ColumnMenuClick {
  column: IccColumnConfig;
  event: MouseEvent;
}

export interface IccGridConfig {
  gridId: string; // auto generated unique id internal use //WARNING internal state ???
  isTreeGrid: boolean;
  urlKey: string; // Only for remote grid config and data
  viewportReady: boolean; //WARNING internal state
  columnSort: boolean;
  columnFilter: boolean;
  columnResize: boolean;
  columnReorder: boolean;
  columnMenu: boolean;
  columnHidden: boolean;
  gridEditable: boolean; //WARNING internal state ??
  recordKey: string;
  restEdit: boolean; //WARNING internal state
  recordModified: boolean; //WARNING internal state
  remoteGridConfig: boolean;
  remoteColumnsConfig: boolean;
  rowSelection: boolean;
  multiRowSelection: boolean;
  rowGroup: boolean;
  horizontalScroll: boolean;
  verticalScroll: boolean;
  virtualScroll: boolean;
  viewportWidth: number; //WARNING internal state
  sortFields: IccSortField[];
  columnFilters: IccColumnFilter[];
  page: number; //WARNING internal state or input ??
  pageSize: number; //WARNING internal state
  totalCounts: number; //WARNING internal state not sure it is used
  remoteGridData: boolean;
  hideTopbar: boolean;
  hideGridFooter: boolean;
  rowHeight: number;
  headerHeight: number;
  rowGroupField?: IccRowGroupField;
  groupHeader?: boolean;
  refreshRate: number;
  lastUpdateTime: Date; //WARNING internal state
}

export interface GridState {
  [key: string]: IccGridState;
}

export interface IccGridSetting {
  viewportReady: boolean;
  viewportWidth: number; //WARNING internal state
  lastUpdateTime: Date;

  gridEditable: boolean; //WARNING internal state ??
  restEdit: boolean; //WARNING internal state
  recordModified: boolean; //WARNING internal state
  pageSize: number; //WARNING internal state
  totalCounts: number; //WARNING internal state not sure it is used
}

export interface IccGridState<T extends object = object> {
  gridConfig: IccGridConfig;
  gridSetting: IccGridSetting;
  columnsConfig: IccColumnConfig[];
  data: T[];
  totalCounts: number;
  inMemoryData: T[];
  selection: SelectionModel<T>;
  queryData: T[]; // for row group temporary data
  rowGroups?: IccRowGroups; // row group will handle at client side data only and only with one level
  modified: { [key: string]: unknown }[];
}

export interface IccGridData<T> {
  data: T[];
  totalCounts: number;
}

export interface IccColumnWidth {
  name: string;
  width: number;
}

export type IccFilterValueType =
  | string
  | number
  | boolean
  | Date
  | IccDateRange
  | string[]
  | number[]
  | object[]
  | null;

export interface IccColumnFilter {
  name: string;
  value: IccFilterValueType;
}

export type IccRendererType =
  | IccObjectType.Component
  | IccObjectType.Date
  | IccObjectType.Function
  | IccObjectType.Image
  | IccObjectType.Number
  | IccObjectType.Select
  | IccObjectType.Text;

export type IccFilterField = IccObjectType.DateRange | IccObjectType.Number | IccObjectType.Select | IccObjectType.Text;

export interface IccColumnConfig {
  name: string;
  title?: string;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  //index?: number;
  //draggable?: boolean;
  sortField?: boolean;
  filterField?: boolean | IccFilterField;
  filterFieldConfig?: IccFieldConfig;
  groupField?: boolean;
  groupHeader?: IccGroupHeader;

  rendererType?: IccRendererType;
  rendererFieldConfig?: IccFieldConfig;
  component?: Type<unknown>; // renderer component
  renderer?: Function; // renderer function

  cellEditable?: boolean;

  //editField?: IccEditField;
  //validations?: IccValidation[];
  //cellReadonly?: boolean | Function;

  //priority?: number;
  //menu?: boolean | IccMenuItem;
}
