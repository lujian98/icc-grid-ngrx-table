import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {
  minValue?: number;
  maxValue?: number;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: IccFieldType.Number,
  fieldName: 'numberfield',
  ...defaultBaseField,
};
