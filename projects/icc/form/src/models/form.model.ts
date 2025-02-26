import { ValidatorFn } from '@angular/forms';
import { IccButtonConfg } from '@icc/ui/core';
import { IccFormField } from '@icc/ui/fields';

export interface IccFormConfig {
  formId: string; // auto generated unique id
  urlKey: string; // Only for remote config
  title?: string;
  remoteFormConfig: boolean;
  remoteFieldsConfig: boolean;
  remoteFormData: boolean;
  editable: boolean;
  //readonly: boolean;
  labelWidth?: number | string;
  validators?: ValidatorFn | ValidatorFn[];
  autoFitHeight: boolean;
  buttons: IccButtonConfg[];
}

export interface IccFormSetting {
  // for internal grid setting
  formId: string; // auto generated unique id
  editing: boolean;
}

export interface FormState {
  [key: string]: IccFormState;
}

export interface IccFormState<T extends object = object> {
  formConfig: IccFormConfig;
  formSetting: IccFormSetting;
  formFields: IccFormField[];
  formData: object | undefined;
}

export interface IccFormButtonClick {
  button: IccButtonConfg;
  formData: object;
}
