import { IccBaseField } from '../../models/base-field.model';

export interface IccDateFieldConfig extends IccBaseField {}

export const defaultDateFieldConfig: IccDateFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'ICC.UI.FIELDS.DATE.PLACEHOLDER',
  clearValue: true,
};
