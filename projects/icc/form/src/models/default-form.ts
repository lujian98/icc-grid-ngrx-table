import { IccFormConfig, IccFormState, IccFormButtonConfg, IccFormButtonType } from './form.model';

export const buttons: IccFormButtonConfg[] = [
  {
    name: IccFormButtonType.Edit,
    title: 'Edit',
    icon: 'pen-to-square',
  },
  {
    name: IccFormButtonType.Refresh,
    title: 'Refresh',
    icon: 'refresh',
  },
  {
    name: IccFormButtonType.Save,
    title: 'Save',
    icon: 'floppy-disk',
  },
  {
    name: IccFormButtonType.Reset,
    title: 'Reset',
    icon: 'right-left',
  },
  {
    name: IccFormButtonType.View,
    title: 'View',
    icon: 'glasses',
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
