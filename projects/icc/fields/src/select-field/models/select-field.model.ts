import { IccBaseField } from '../../models/base-field.model';

export type IccOptionType = string | object;

export interface IccSelectFieldConfig extends IccBaseField {
  fieldId: string; // auto generated unique id
  urlKey: string; // Only for remote field config and options
  viewportReady: boolean;
  remoteConfig: boolean; // remote config requires remote options
  remoteOptions: boolean;
  selectOnly: boolean; // false select, true autocomplete
  multiSelection: boolean;
  checkAll: boolean; // only for multiSelection is true
  uncheckAll: boolean; // only for multiSelection is true
  isEmpty: boolean; // only for multiSelection is true
  notEmpty: boolean; // only for multiSelection is true
  singleListOption: boolean;
  optionLabel: string;
  optionKey: string;
  options?: IccOptionType[]; // only used for local initial input
  //virtualScroll: boolean; // only support virtualScroll
}

export interface SelectFieldState {
  [key: string]: IccSelectFieldState;
}

export interface IccSelectFieldState {
  fieldConfig: IccSelectFieldConfig;
  options: IccOptionType[];
}
