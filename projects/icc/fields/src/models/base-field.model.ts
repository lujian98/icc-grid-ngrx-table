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
  readonly?: boolean; // formcontrl disabled inital setup only
  editable?: boolean; // formcontrl disable by ngrx switch control FormConfig editable
  hidden?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
  requiredFields?: string[]; // for boolean or select condition true children is required.
  readonlyFields?: string[]; // for boolean or select condition true children is readonly (need use cases).
  // visibleFields?: string[]; // for boolean or select condition true children is visible (need use cases).
  readonlyHidden?: boolean;
}
