import { IccBaseField } from '../../models/base-field.model';

export interface IccRadioGroupFieldConfig extends IccBaseField {
  groups: any[];
}

export const defaultRadioGroupFieldConfig: IccRadioGroupFieldConfig = {
  fieldType: 'radiogroup',
  fieldName: 'radiogroupfield',
  groups: [],
};
