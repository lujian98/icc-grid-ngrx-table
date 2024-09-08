import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultSelectFieldState } from '../models/default-select-field';
import * as selectFieldActions from './select-field.actions';

export const iccSelectFieldFeature = createFeature({
  name: 'iccSelectField',
  reducer: createReducer(
    defaultSelectFieldState,
    on(selectFieldActions.setupFieldConfig, (state, { fieldConfig }) => ({
      ...state,
      fieldConfig,
    })),
    on(selectFieldActions.setSelectFieldOptions, (state, { options }) => ({
      ...state,
      options,
    })),
  ),
});
