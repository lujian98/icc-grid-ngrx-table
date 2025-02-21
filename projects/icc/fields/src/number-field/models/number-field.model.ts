import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {
  minValue?: number;
  maxValue?: number;
  decimals: number;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: IccFieldType.Number,
  fieldName: 'numberfield',
  decimals: 0,
  ...defaultBaseField,
};
