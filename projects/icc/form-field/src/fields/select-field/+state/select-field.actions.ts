import { createAction, props } from '@ngrx/store';
import { IccSelectFieldConfig } from '../models/select-field.model';

export const setupFieldConfig = createAction(
  '[SelectField] Setup Field Config',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const setSelectFieldOptions = createAction(
  '[SelectField] Set Select Field Options',
  props<{ fieldId: string; options: any[] }>(),
);

export const getSelectFieldOptions = createAction(
  '[SelectField] Get Select Field Options',
  props<{ fieldId: string; fieldConfig: IccSelectFieldConfig }>(),
);

export const clearSelectFieldStore = createAction('[Grid] Clear Select Field Store', props<{ fieldId: string }>());
