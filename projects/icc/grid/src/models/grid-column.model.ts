
export interface IccSortField {
  field: string;
  dir: string;
}

export interface IccGridConfig {
  gridName: string;
  page: number;
  pageSize: number;
  totalCounts: number;
  hasScrollY: boolean,
  sortFields: IccSortField[],
  rowSelection: boolean;
  columnReorder: boolean;
  columnResize: boolean;
}

export interface IccGridState {
  [key: string]: GridState;
}

export interface GridState<T extends object = object> {
  gridConfig: IccGridConfig;
  columnConfig: IccColumnConfig[];
  data: T[];
  totalCounts: number;
}


export interface IccGridData<T> {
  data: T[];
  totalCounts: number;
}

export const defaultGridConfig: IccGridConfig = {
  gridName: 'test',
  page: 1,
  pageSize: 20,
  totalCounts: 0,
  sortFields: [],
  hasScrollY: false,
  rowSelection: false,
  columnReorder: false,
  columnResize: false,
}

export const defaultState: GridState = {
  gridConfig: defaultGridConfig,
  columnConfig: [],
  data: [],
  totalCounts: 0,
}

export interface IccColumnConfig {
  //header?: string;
  name: string;
  title?: string;
  //field: string;
  fieldType?: string; // | SunFieldType | SunTextFieldType | SunNumberFieldType | SunSelectFieldType;
  //index?: number;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  //validations?: SunValidation[];
  width?: number;
  fixedWidth?: boolean | 'auto';
  minWidth?: number;
  draggable?: boolean;
  align?: string;
  dateFormat?: string;
  dateRangePreset?: boolean;
}
