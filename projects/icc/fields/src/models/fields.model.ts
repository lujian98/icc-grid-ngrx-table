import { IccFieldsetConfig } from '../fieldset/models/fieldset.model';
import { IccTextFieldConfig } from '../text-field/models/text-field.model';
import { IccSelectFieldConfig } from '../select-field/models/select-field.model';

export type IccFormField = IccFieldsetConfig | IccTextFieldConfig | IccSelectFieldConfig;
