import { IccBaseField, IccFieldType } from '../../models/base-field.model';
import { IccFormField } from '../../models/fields.model';

export interface IccFieldsetConfig extends IccBaseField {
  legend?: string;
  labelWidth?: number | string;
  flexDirection: 'column' | 'row';
  formFields: IccFormField[];
}

export const defaultFieldsetConfig: IccFieldsetConfig = {
  fieldType: IccFieldType.Fieldset,
  flexDirection: 'column',
  formFields: [],
};
