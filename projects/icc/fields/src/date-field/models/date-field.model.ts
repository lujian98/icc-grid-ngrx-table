import { IccBaseField } from '../../models/base-field.model';

export interface IccDateFieldConfig extends IccBaseField {}

export const defaultDateFieldConfig: IccDateFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'Select Date',
  clearValue: true,
  labelWidth: 100,
};
