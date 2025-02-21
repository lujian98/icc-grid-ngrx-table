import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccRadioGroup {
  name: string;
  title: string;
}

export interface IccRadioGroupFieldConfig extends IccBaseField {
  groups: IccRadioGroup[];
}

export const defaultRadioGroupFieldConfig: IccRadioGroupFieldConfig = {
  fieldType: IccObjectType.RadioGroup,
  fieldName: 'radiogroupfield',
  groups: [],
  ...defaultBaseField,
};
