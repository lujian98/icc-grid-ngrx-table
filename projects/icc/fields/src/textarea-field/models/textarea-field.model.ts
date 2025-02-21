import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccTextareaFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextareaFieldConfig: IccTextareaFieldConfig = {
  fieldType: IccFieldType.Textarea,
  fieldName: 'textareafield',
  ...defaultBaseField,
};
