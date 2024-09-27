import { IccBaseField } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {
  minValue?: number;
  maxValue?: number;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: 'number',
  fieldName: 'numberfield',
  placeholder: '',
  clearValue: false,
};
