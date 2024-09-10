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

export const setSelectFieldOptions = createAction(
  '[SelectField] Set Select Field Options',
  props<{ fieldId: string; options: any[] }>(),
);

export const getSelectFieldOptions = createAction(
  '[SelectField] Get Select Field Options',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const clearSelectFieldStore = createAction('[Grid] Clear Select Field Store', props<{ fieldId: string }>());
