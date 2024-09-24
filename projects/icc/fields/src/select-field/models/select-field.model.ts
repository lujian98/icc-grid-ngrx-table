export interface IccSelectFieldConfig {
  fieldId: string; // auto generated unique id
  fieldType: string;
  fieldName?: string;
  urlKey: string; // Only for remote field config and options
  viewportReady: boolean;
  fieldLabel?: string;
  remoteConfig: boolean; // remote config requires remote options
  remoteOptions: boolean;
  selectOnly: boolean; // false select, true autocomplete
  multiSelection: boolean;
  singleListOption: boolean;
  optionLabel: string;
  optionKey: string;
  placeholder: string;
  clearValue?: boolean;
}

export interface SelectFieldState {
  [key: string]: IccSelectFieldState;
}

export interface IccSelectFieldState<T extends object = object> {
  fieldConfig: IccSelectFieldConfig;
  options: T[];
}
