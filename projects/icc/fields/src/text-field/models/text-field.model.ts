import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccTextFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: IccObjectType.Text,
  fieldName: 'textfield',
  ...defaultBaseField,
};
