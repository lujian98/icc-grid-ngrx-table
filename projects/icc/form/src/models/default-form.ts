import { IccFormConfig, IccFormState, IccFormSetting } from './form.model';
import { IccBUTTONS, IccButtonConfg } from '@icc/ui/core';

export const buttons: IccButtonConfg[] = [
  IccBUTTONS.Edit,
  IccBUTTONS.Refresh,
  IccBUTTONS.Save,
  IccBUTTONS.Reset,
  IccBUTTONS.View,
];

export const defaultFormConfig: IccFormConfig = {
  urlKey: 'formfields', // Only for remote config
  remoteFormConfig: false,
  remoteFieldsConfig: false,
  remoteFormData: false,
  editable: false,
  //readonly: false,
  autoFitHeight: true,
  buttons: buttons,
};

export const defaultFormSetting: IccFormSetting = {
  formId: '191cf2bb6b5', // auto generated unique id
  editing: false,
};

export const defaultFormState: IccFormState = {
  formConfig: defaultFormConfig,
  formSetting: defaultFormSetting,
  formFields: [],
  formData: undefined,
};
