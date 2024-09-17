export interface IccFormConfig {
  formId: string; // auto generated unique id
  formName: string;
  urlKey: string; // Only for remote config
}

export interface FormState {
  [key: string]: IccFormState;
}

export interface IccFormState<T extends object = object> {
  formConfig: IccFormConfig;
  formFields: T[];
}
