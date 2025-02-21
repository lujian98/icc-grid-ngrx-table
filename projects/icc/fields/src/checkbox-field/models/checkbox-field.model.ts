import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccCheckboxFieldConfig extends IccBaseField {
  labelBeforeCheckbox?: boolean;
}

export const defaultCheckboxFieldConfig: IccCheckboxFieldConfig = {
  fieldType: IccFieldType.Checkbox,
  fieldName: 'checkboxfield',
  labelBeforeCheckbox: true,
  ...defaultBaseField,
};
