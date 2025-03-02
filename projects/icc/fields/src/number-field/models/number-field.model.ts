import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccNumberFieldConfig extends IccBaseField {
  minValue?: number;
  maxValue?: number;
  decimals: number;
  mouseLeaveBlur?: boolean;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: IccObjectType.Number,
  fieldName: 'numberfield',
  decimals: 0,
  mouseLeaveBlur: false,
  ...defaultBaseField,
};
