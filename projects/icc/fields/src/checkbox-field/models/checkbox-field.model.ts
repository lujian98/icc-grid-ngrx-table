import { IccBaseField } from '../../models/base-field.model';

export interface IccCheckboxFieldConfig extends IccBaseField {}

export const defaultCheckboxFieldConfig: IccCheckboxFieldConfig = {
  fieldType: 'checkbox',
  fieldName: 'checkboxfield',
};
