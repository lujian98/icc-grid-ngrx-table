import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldId: '191cf2bb6b5', // auto generated unique id
  fieldName: 'selectfield', // form field name need set
  urlKey: 'select', // Only for remote field config and options
  fieldLabel: undefined,
  remoteConfig: false, // remote config requires remote options
  remoteOptions: false,
  selectOnly: true, // false select, true autocomplete
  multiSelection: false,
  singleListOption: false,
  optionLabel: 'title',
  optionKey: 'name',
  placeholder: '',
};

export const defaultSelectFieldState: IccSelectFieldState = {
  fieldConfig: defaultSelectFieldConfig,
  options: [],
};
