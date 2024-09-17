export interface IccFormConfig {
  formId: string; // auto generated unique id
  urlKey: string; // Only for remote config
  remoteFormConfig: boolean;
  remoteFieldsConfig: boolean;
  remoteValues: boolean;
  readonly: boolean;
}

export interface FormState {
  [key: string]: IccFormState;
}

/*
export interface IccFormData<T> {
  formConfig: IccFormConfig;
  formData: T;
}*/

export interface IccFormState<T extends object = object> {
  formConfig: IccFormConfig;
  formFields: T[];
  formData: T;
}
