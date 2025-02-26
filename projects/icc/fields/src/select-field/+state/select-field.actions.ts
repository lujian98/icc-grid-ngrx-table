import { createAction, props } from '@ngrx/store';
import { IccSelectFieldConfig, IccOptionType } from '../models/select-field.model';

export const initFieldConfig = createAction(
  '[SelectField] Init Field Config',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const loadRemoteFieldConfig = createAction(
  '[SelectField] Load Remote Field Config',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const loadFieldConfigSuccess = createAction(
  '[SelectField] Load Field Config Success',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const loadSelectFieldOptions = createAction(
  '[SelectField] Load Select Field Options',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const loadSelectFieldOptionsSuccess = createAction(
  '[SelectField] Load Select Field Options Success',
  props<{ fieldId: string; options: IccOptionType[] }>(),
);

export const clearSelectFieldStore = createAction(
  '[SelectField]] Clear Select Field Store',
  props<{ fieldId: string }>(),
);
export const removeSelectFieldStore = createAction(
  '[SelectField]] Remove Select Field Store',
  props<{ fieldId: string }>(),
);
