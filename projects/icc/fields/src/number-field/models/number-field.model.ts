import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {
  minValue?: number;
  maxValue?: number;
  decimals: number;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: IccObjectType.Number,
  fieldName: 'numberfield',
  decimals: 0,
  ...defaultBaseField,
};
