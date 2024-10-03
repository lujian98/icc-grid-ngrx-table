import { ValidatorFn } from '@angular/forms';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';

export enum IccFormButtonType {
  Edit = 'Edit',
  Refresh = 'Refresh',
  Reset = 'Reset',
  View = 'View',
  Save = 'Save',
}

export interface IccFormButtonConfg {
  name: string;
  title: string;
  icon?: string;
}

export interface IccFormConfig {
  formId: string; // auto generated unique id
  urlKey: string; // Only for remote config
  remoteFormConfig: boolean;
  remoteFieldsConfig: boolean;
  remoteFormData: boolean;
  editable: boolean;
  //readonly: boolean;
  labelWidth?: number | string;
  validators?: ValidatorFn | ValidatorFn[];
  autoFitHeight: boolean;
  buttons: IccFormButtonConfg[];
}

export interface FormState {
  [key: string]: IccFormState;
}

export interface IccFormState<T extends object = object> {
  formConfig: IccFormConfig;
  formFields: IccFormField[];
  formData: T | undefined;
}
