import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccPasswordFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultPasswordFieldConfig: IccPasswordFieldConfig = {
  fieldType: IccObjectType.Password,
  fieldName: 'passwordfield',
  ...defaultBaseField,
};
