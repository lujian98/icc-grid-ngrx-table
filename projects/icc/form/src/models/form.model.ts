import { ValidatorFn } from '@angular/forms';

export interface IccFormConfig {
  formId: string; // auto generated unique id
  urlKey: string; // Only for remote config
  remoteFormConfig: boolean;
  remoteFieldsConfig: boolean;
  remoteFormData: boolean;
  readonly: boolean;
  labelWidth?: number | string;
  validators?: ValidatorFn | ValidatorFn[];
}

export interface FormState {
  [key: string]: IccFormState;
}

export interface IccFormState<T extends object = object> {
  formConfig: IccFormConfig;
  formFields: T[];
  formData: T | undefined;
}
