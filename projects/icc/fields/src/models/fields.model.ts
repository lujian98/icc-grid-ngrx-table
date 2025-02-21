import { IccCheckboxFieldConfig } from '../checkbox-field/models/checkbox-field.model';
import { IccDateFieldConfig } from '../date-field/models/date-field.model';
import { IccDateRangeFieldConfig } from '../date-range-field/models/date-range-field.model';
import { IccDisplayFieldConfig } from '../display-field/models/display-field.model';
import { IccFieldsetConfig } from '../fieldset/models/fieldset.model';
import { IccHiddenFieldConfig } from '../hidden-field/models/hidden-field.model';
import { IccNumberFieldConfig } from '../number-field/models/number-field.model';
import { IccPasswordFieldConfig } from '../password-field/models/password-field.model';
import { IccRadioGroupFieldConfig } from '../radio-group-field/models/radio-group-field.model';
import { IccSelectFieldConfig } from '../select-field/models/select-field.model';
import { IccTextFieldConfig } from '../text-field/models/text-field.model';
import { IccTextareaFieldConfig } from '../textarea-field/models/textarea-field.model';
import { IccUploadFileFieldConfig } from '../upload-file-field/models/upload-file-field.model';
import { IccBaseField } from './base-field.model';

export type IccFormField =
  | IccBaseField
  | IccCheckboxFieldConfig
  | IccDateFieldConfig
  | IccDateRangeFieldConfig
  | IccDisplayFieldConfig
  | IccFieldsetConfig
  | IccHiddenFieldConfig
  | IccNumberFieldConfig
  | IccPasswordFieldConfig
  | IccRadioGroupFieldConfig
  | IccSelectFieldConfig
  | IccTextFieldConfig
  | IccTextareaFieldConfig
  | IccUploadFileFieldConfig;

export type IccFieldConfig = Partial<IccFormField>;
