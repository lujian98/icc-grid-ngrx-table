import { Type } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IccRowGroups } from '../services/row-group/row-groups';
import { IccFormField, IccDateRange } from '@icc/ui/fields';

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
  multiRowSelection: boolean;
  rowGroup: boolean;
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
  headerHeight: number;
  rowGroupField?: IccRowGroupField;
  groupHeader?: boolean;
  refreshRate: number;
  lastUpdateTime: Date;
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
  selection: SelectionModel<T>;
  queryData: T[]; // for row group temporary data
  rowGroups?: IccRowGroups; // row group will handle at client side data only and wwith one level
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

export enum IccFieldType {
  Date = 'Date',
  Image = 'Image',
  Text = 'Text',
}

export type IccRendererType = IccFieldType.Text | IccFieldType.Image | IccFieldType.Date;
export type IccFilterField = boolean | 'text' | 'number' | 'select' | 'dateRange';
export type IccFilterFieldConfig = Partial<IccFormField>;
export type IccGroupField = boolean | string;

export interface IccColumnConfig {
  name: string;
  title?: string;

  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  sortField?: boolean;
  filterField?: IccFilterField;
  filterFieldConfig?: IccFilterFieldConfig;

  rendererType?: IccRendererType;
  component?: Type<unknown>; // renderer component
  renderer?: Function; // renderer function
  dateFormat?: string;
  groupField?: IccGroupField;
  groupHeader?: IccGroupHeader;

  //field: string;
  //index?: number;
  //draggable?: boolean;

  //editField?: IccEditField;
  //validations?: IccValidation[];
  //cellReadonly?: boolean | Function;
  //dateFormat?: string;
  //dateRangePreset?: boolean;
  //priority?: number;
  //menu?: boolean | IccMenuItem;
}
