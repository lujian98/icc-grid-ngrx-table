import { ValidatorFn } from '@angular/forms';

export interface IccBaseField {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
  placeholder?: string;
  clearValue?: boolean;
  labelWidth?: number | string;
  fieldWidth?: number | string;
  required?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
}
