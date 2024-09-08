import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldName: 'icc-select',
  fieldLabel: undefined,
  selectOnly: false, // false select, true autocomplete
  multiSelection: false,
  value: undefined,
  optionLabel: 'name',
  optionKey: 'title',
  placeholder: '',
};

export const defaultSelectFieldState: IccSelectFieldState = {
  fieldConfig: defaultSelectFieldConfig,
  options: [],
};
