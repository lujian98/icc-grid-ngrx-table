export interface IccSelectFieldConfig {
  fieldId: string; // auto generated unique id
  fieldName: string;
  urlKey: string; // Only for remote field config and options
  fieldLabel?: string;
  remoteOptions: boolean;
  selectOnly: boolean; // false select, true autocomplete
  multiSelection: boolean;
  singleListOption: boolean;
  optionLabel: string;
  optionKey: string;
  placeholder: string;
}

export interface SelectFieldState {
  [key: string]: IccSelectFieldState;
}

export interface IccSelectFieldState<T extends object = object> {
  fieldConfig: IccSelectFieldConfig;
  options: T[];
}
