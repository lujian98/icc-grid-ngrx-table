export interface IccCellEditData<T> {
  dataKeyId: string;
  dataKeyValue: string;
  field: string;
  value: T;
}

export interface IccCellEditKey {
  rowIndex: number;
  colIndex: number;
  keyCode: number;
  direction: string;
}

export enum IccKeyboard {
  ENTER = 13,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
}

export enum IccDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  EXACT = 'exact',
}
