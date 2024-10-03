import { IccFormConfig, IccFormState, IccFormButtonConfg } from './form.model';

export const buttons: IccFormButtonConfg[] = [
  {
    name: 'Edit',
    title: 'Edit',
    visible: { editable: false },
  },
  {
    name: 'Reset',
    title: 'Reset',
    visible: { editable: true },
    disabled: { dirty: false },
  },
  {
    name: 'View',
    title: 'View',
    visible: { editable: true },
  },
  {
    name: 'Save',
    title: 'Save',
    visible: { editable: true },
    disabled: { dirty: false, invalid: true },
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
