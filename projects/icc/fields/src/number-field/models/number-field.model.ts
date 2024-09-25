import { IccBaseField } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: 'number',
  fieldName: 'numberfield',
  placeholder: '',
  clearValue: false,
  labelWidth: 100,
};
