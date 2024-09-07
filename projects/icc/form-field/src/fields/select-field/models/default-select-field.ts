import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldName: 'icc-select',
};

export const defaultSelectFieldState: IccSelectFieldState = {
  selectFieldConfig: defaultSelectFieldConfig,
  data: [],
};
