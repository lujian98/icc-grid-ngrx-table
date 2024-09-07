import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldName: 'icc-select',
  selectOnly: false, // false select, true autocomplete
  multiSelection: false,
  value: undefined,
  options: [],
  optionLabel: 'name',
  optionKey: 'title',
  placeholder: '',
};

export const defaultSelectFieldState: IccSelectFieldState = {
  selectFieldConfig: defaultSelectFieldConfig,
  data: [],
};
