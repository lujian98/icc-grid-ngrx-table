import { IccBaseField } from '../../models/base-field.model';

export type IccOptionType = string | object;

//TODO add filter remote option if needed???
export interface IccSelectFieldConfig extends IccBaseField {
  urlKey: string; // Only for remote field config and options
  remoteConfig: boolean; // remote config requires remote options
  remoteOptions: boolean;
  selectOnly: boolean; // true select, false autocomplete
  multiSelection: boolean;
  checkAll: boolean; // only for multiSelection is true
  uncheckAll: boolean; // only for multiSelection is true
  isEmpty: boolean;
  notEmpty: boolean;
  optionLabel: string;
  optionKey: string;
  options?: IccOptionType[]; // only used for local initial input
  displayWith?: (value: string | object | object[]) => string;
}

export interface IccSelectFieldSetting {
  // for internal setting
  fieldId: string;
  viewportReady: boolean;
  singleListOption: boolean;
}

export interface SelectFieldState {
  [key: string]: IccSelectFieldState;
}

export interface IccSelectFieldState {
  fieldConfig: IccSelectFieldConfig;
  fieldSetting: IccSelectFieldSetting;
  options: IccOptionType[];
}
