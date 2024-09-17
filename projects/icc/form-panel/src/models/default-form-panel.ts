import { IccFormPanelConfig, IccFormPanelState } from './form-panel.model';

export const defaultFormPanelConfig: IccFormPanelConfig = {
  formPanelId: '191cf2bb6b5', // auto generated unique id
  formPanelName: 'selectfield', // form form field name need set
  urlKey: 'formfields', // Only for remote config
};

export const defaultFormPanelState: IccFormPanelState = {
  formPanelConfig: defaultFormPanelConfig,
  formFields: [],
};
