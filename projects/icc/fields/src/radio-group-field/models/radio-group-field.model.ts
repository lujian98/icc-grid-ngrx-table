import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccRadioGroup {
  name: string;
  title: string;
}

export interface IccRadioGroupFieldConfig extends IccBaseField {
  groups: IccRadioGroup[];
}

export const defaultRadioGroupFieldConfig: IccRadioGroupFieldConfig = {
  fieldType: IccFieldType.RadioGroup,
  fieldName: 'radiogroupfield',
  groups: [],
  ...defaultBaseField,
};
