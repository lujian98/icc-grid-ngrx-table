import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccCheckboxFieldConfig extends IccBaseField {
  labelBeforeCheckbox?: boolean;
}

export const defaultCheckboxFieldConfig: IccCheckboxFieldConfig = {
  fieldType: 'checkbox',
  fieldName: 'checkboxfield',
  labelBeforeCheckbox: true,
  ...defaultBaseField,
};
