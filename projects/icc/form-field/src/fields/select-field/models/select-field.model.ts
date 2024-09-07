export interface IccSelectFieldConfig {
  fieldName: string;
  urlKey?: string; // Only for remote. if not defined, use gridName
}

export interface IccSelectFieldState<T extends object = object> {
  selectFieldConfig: IccSelectFieldConfig;
  data: T[];
}
