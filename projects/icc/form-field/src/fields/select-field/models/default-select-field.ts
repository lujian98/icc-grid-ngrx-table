import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldId: '191cf2bb6b5',
  fieldName: 'icc-select',
  fieldLabel: undefined,
  remoteOptions: false,
  selectOnly: false, // false select, true autocomplete
  multiSelection: false,
  optionLabel: 'name',
  optionKey: 'title',
  placeholder: '',
};

export const defaultSelectFieldState: IccSelectFieldState = {
  fieldConfig: defaultSelectFieldConfig,
  options: [],
};
