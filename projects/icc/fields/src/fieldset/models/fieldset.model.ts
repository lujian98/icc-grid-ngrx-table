import { IccBaseField } from '../../models/base-field.model';
import { IccFormField } from '../../models/fields.model';

export interface IccFieldsetConfig extends IccBaseField {
  legend?: string;
  formFields: IccFormField[];
}

export const defaultFieldsetConfig: IccFieldsetConfig = {
  fieldType: 'fieldset',
  formFields: [],
};
