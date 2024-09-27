import { IccBaseField } from '../../models/base-field.model';

export interface IccTextareaFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextareaFieldConfig: IccTextareaFieldConfig = {
  fieldType: 'textarea',
  fieldName: 'textareafield',
  placeholder: '',
  clearValue: true,
};
