import { createAction, props } from '@ngrx/store';
import { IccSelectFieldConfig } from '../models/select-field.model';

export const initFieldConfig = createAction(
  '[SelectField] Init Field Config',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const loadRemoteFieldConfig = createAction(
  '[SelectField] Load Remote Field Config',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const loadFieldConfigSuccess = createAction(
  '[SelectField] Load Field Config Success',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const loadSelectFieldOptions = createAction(
  '[SelectField] Load Select Field Options',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const loadSelectFieldOptionsSuccess = createAction(
  '[SelectField] Load Select Field Options Success',
  props<{ fieldId: string; options: any[] }>(),
);

export const clearSelectFieldStore = createAction('[Grid] Clear Select Field Store', props<{ fieldId: string }>());
