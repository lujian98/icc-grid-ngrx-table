import { Type } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IccRowGroups } from '../services/row-group/row-groups';
import { IccFieldConfig, IccDateRange, IccFieldType } from '@icc/ui/fields';

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
  rowGroups?: IccRowGroups; // row group will handle at client side data only and only with one level
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
  | IccFieldType.Date
  | IccFieldType.Image
  | IccFieldType.Number
  | IccFieldType.Select
  | IccFieldType.Text;

export type IccFilterField = IccFieldType.DateRange | IccFieldType.Number | IccFieldType.Select | IccFieldType.Text;

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
  groupField?: boolean; //IccGroupField;
  groupHeader?: IccGroupHeader;

  rendererType?: IccRendererType;
  rendererFieldConfig?: IccFieldConfig;
  component?: Type<unknown>; // renderer component
  renderer?: Function; // renderer function
  dateFormat?: string; // TODO move to rendererFieldConfig ???

  //editField?: IccEditField;
  //validations?: IccValidation[];
  //cellReadonly?: boolean | Function;

  //priority?: number;
  //menu?: boolean | IccMenuItem;
}
