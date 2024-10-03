import { IccFormConfig, IccFormState, IccFormButtonConfg, IccFormButtonType } from './form.model';

export const buttons: IccFormButtonConfg[] = [
  {
    name: IccFormButtonType.Edit,
    title: 'Edit',
  },
  {
    name: IccFormButtonType.Refresh,
    title: 'Refresh',
  },
  {
    name: IccFormButtonType.Reset,
    title: 'Reset',
  },
  {
    name: IccFormButtonType.View,
    title: 'View',
  },
  {
    name: IccFormButtonType.Save,
    title: 'Save',
  },
];

export const defaultFormConfig: IccFormConfig = {
  formId: '191cf2bb6b5', // auto generated unique id
  urlKey: 'formfields', // Only for remote config
  remoteFormConfig: false,
  remoteFieldsConfig: false,
  remoteFormData: false,
  editable: false,
  //readonly: false,
  autoFitHeight: true,
  buttons: buttons,
};

export const defaultFormState: IccFormState = {
  formConfig: defaultFormConfig,
  formFields: [],
  formData: undefined,
};
