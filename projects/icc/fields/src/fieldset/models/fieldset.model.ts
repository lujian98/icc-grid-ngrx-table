import { IccFormField } from '../../models/fields.model';

export interface IccFieldsetConfig {
  fieldType: string;
  fieldName?: string; // not used only interface
  legend?: string;
  formFields: IccFormField[];
}

export const defaultFieldsetConfig: IccFieldsetConfig = {
  fieldType: 'fieldset',
  formFields: [],
};
