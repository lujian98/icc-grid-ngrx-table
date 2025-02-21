import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccTextareaFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextareaFieldConfig: IccTextareaFieldConfig = {
  fieldType: IccObjectType.Textarea,
  fieldName: 'textareafield',
  ...defaultBaseField,
};
