export interface IccFormPanelConfig {
  formPanelId: string; // auto generated unique id
  formPanelName: string;
  urlKey: string; // Only for remote config
}

export interface FormPanelState {
  [key: string]: IccFormPanelState;
}

export interface IccFormPanelState<T extends object = object> {
  formPanelConfig: IccFormPanelConfig;
  formFields: T[];
}
