
export interface IccGridConfig {
  gridName: string;
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
  TotalCounts: number;
}


export interface IccGridData<T> {
  data: T[];
  //TotalCounts: number;
}

export const defaultGridConfig: IccGridConfig = {
  gridName: 'test',
  rowSelection: false,
  columnReorder: false,
  columnResize: false,
}

export const defaultState: GridState = {
  gridConfig: defaultGridConfig,
  columnConfig: [],
  data: [],
  TotalCounts: 0,
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
