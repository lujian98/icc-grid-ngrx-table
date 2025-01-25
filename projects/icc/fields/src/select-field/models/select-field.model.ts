import { IccBaseField } from '../../models/base-field.model';

export interface IccSelectFieldConfig extends IccBaseField {
  fieldId: string; // auto generated unique id
  urlKey: string; // Only for remote field config and options
  viewportReady: boolean;
  remoteConfig: boolean; // remote config requires remote options
  remoteOptions: boolean;
  selectOnly: boolean; // false select, true autocomplete
  multiSelection: boolean;
  singleListOption: boolean;
  optionLabel: string;
  optionKey: string;
  options?: any[];
  virtualScroll: boolean;
}

export interface SelectFieldState {
  [key: string]: IccSelectFieldState;
}

export interface IccSelectFieldState<T extends object = object> {
  fieldConfig: IccSelectFieldConfig;
  options: T[];
}
