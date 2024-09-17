import { IccFormConfig, IccFormState } from './form.model';

export const defaultFormConfig: IccFormConfig = {
  formId: '191cf2bb6b5', // auto generated unique id
  formName: 'form', // form form field name need set
  urlKey: 'formfields', // Only for remote config
  remoteFormConfig: false,
  remoteFieldsConfig: false,
  remoteValues: false,
};

export const defaultFormState: IccFormState = {
  formConfig: defaultFormConfig,
  formFields: [],
  formData: {},
};
