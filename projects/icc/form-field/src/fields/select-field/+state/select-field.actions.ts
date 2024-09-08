import { createAction, props } from '@ngrx/store';
import { IccSelectFieldConfig } from '../models/select-field.model';

export const setupFieldConfig = createAction(
  '[SelectField] Setup Field Config',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);

export const setSelectFieldOptions = createAction(
  '[SelectField] Set Select Field Options',
  props<{ options: any[] }>(),
);

export const getSelectFieldOptions = createAction(
  '[SelectField] Get Select Field Options',
  props<{ fieldConfig: IccSelectFieldConfig }>(),
);
