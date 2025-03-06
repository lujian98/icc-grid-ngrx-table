import { Type } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IccObjectType } from '@icc/ui/core';
import { IccRowGroups } from '../utils/row-group/row-groups';
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
  gridSetting: IccGridSetting;
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
  urlKey: string; // Only for remote grid config and data
  columnSort: boolean;
  columnFilter: boolean;
  columnResize: boolean;
  columnReorder: boolean;
  columnMenu: boolean;
  columnHidden: boolean;
  recordKey: string; // used for cell edit
  remoteGridConfig: boolean;
  remoteColumnsConfig: boolean;
  rowSelection: boolean;
  multiRowSelection: boolean;
  rowGroup: boolean;
  horizontalScroll: boolean;
  verticalScroll: boolean;
  virtualScroll: boolean;
  sortFields: IccSortField[];
  columnFilters: IccColumnFilter[];
  page: number; // used initial load for saved page
  pageSize: number; //used for vertical scroll
  remoteGridData: boolean;
  hideTopbar: boolean;
  hideGridFooter: boolean;
  rowHeight: number;
  headerHeight: number;
  rowGroupField?: IccRowGroupField;
  groupHeader?: boolean;
  refreshRate: number;
  hasDetailView: boolean;
}

export interface GridState {
  [key: string]: IccGridState;
}

export interface IccGridSetting {
  // for internal grid setting
  gridId: string;
  isTreeGrid: boolean;
  loading: boolean;
  columnUpdating: boolean; // prevent filter fetch data when column changes
  viewportWidth: number;
  lastUpdateTime: Date;
  gridEditable: boolean;
  restEdit: boolean;
  recordModified: boolean;
  viewportReady: boolean;
  totalCounts: number;
  selected: number;
}

export interface IccGridState<T extends object = object> {
  gridConfig: IccGridConfig; // for external grid config
  gridSetting: IccGridSetting; // for internal use only settings
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
  hidden?: boolean | string; // TODO column hidden: 'always' will hide always, 'never' will visible always
  width?: number;
  align?: string;
  draggable?: boolean; // default is true
  sortField?: boolean; // default is true
  filterField?: boolean | IccFilterField;
  filterFieldConfig?: IccFieldConfig;
  groupField?: boolean;
  groupHeader?: IccGroupHeader;

  rendererType?: IccRendererType;
  rendererFieldConfig?: IccFieldConfig;
  component?: Type<unknown>; // renderer component
  renderer?: Function; // renderer function
  cellEditable?: boolean;

  //fixedWidth?: boolean | 'auto';
  //minWidth?: number;
  //editField?: IccEditField;
  //validations?: IccValidation[];
  //menu?: boolean | IccMenuConfig;
}
