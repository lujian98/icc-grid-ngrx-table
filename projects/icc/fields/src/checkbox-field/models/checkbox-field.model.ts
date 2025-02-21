import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccCheckboxFieldConfig extends IccBaseField {
  labelBeforeCheckbox?: boolean;
}

export const defaultCheckboxFieldConfig: IccCheckboxFieldConfig = {
  fieldType: IccObjectType.Checkbox,
  fieldName: 'checkboxfield',
  labelBeforeCheckbox: true,
  ...defaultBaseField,
};
