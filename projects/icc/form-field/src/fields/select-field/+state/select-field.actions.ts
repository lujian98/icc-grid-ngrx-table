import { createAction, props } from '@ngrx/store';
import { IccSelectFieldConfig } from '../models/select-field.model';

export const setupFieldConfig = createAction(
  '[SelectField] Setup Field Config',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);
