export interface IccSelectFieldConfig {
  fieldName: string;
  urlKey?: string; // Only for remote. if not defined, use gridName
  fieldLabel?: string;
  remoteOptions: boolean;
  selectOnly: boolean; // false select, true autocomplete
  multiSelection: boolean;
  optionLabel: string;
  optionKey: string;
  placeholder: string;
}

export interface IccSelectFieldState<T extends object = object> {
  fieldConfig: IccSelectFieldConfig;
  options: T[];
}
