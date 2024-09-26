import { IccBaseField } from './base-field.model';
import { IccCheckboxFieldConfig } from '../checkbox-field/models/checkbox-field.model';
import { IccDateFieldConfig } from '../date-field/models/date-field.model';
import { IccDisplayFieldConfig } from '../display-field/models/display-field.model';
import { IccFieldsetConfig } from '../fieldset/models/fieldset.model';
import { IccHiddenFieldConfig } from '../hidden-field/models/hidden-field.model';
import { IccNumberFieldConfig } from '../number-field/models/number-field.model';
import { IccSelectFieldConfig } from '../select-field/models/select-field.model';
import { IccTextFieldConfig } from '../text-field/models/text-field.model';
import { IccTextareaFieldConfig } from '../textarea-field/models/textarea-field.model';

export type IccFormField =
  | IccBaseField
  | IccCheckboxFieldConfig
  | IccDateFieldConfig
  | IccDisplayFieldConfig
  | IccFieldsetConfig
  | IccHiddenFieldConfig
  | IccNumberFieldConfig
  | IccSelectFieldConfig
  | IccTextFieldConfig
  | IccTextareaFieldConfig;
