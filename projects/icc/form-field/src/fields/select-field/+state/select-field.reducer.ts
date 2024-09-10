import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultSelectFieldState } from '../models/default-select-field';
import { SelectFieldState } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';

export const initialState: SelectFieldState = {};

export const iccSelectFieldFeature = createFeature({
  name: 'iccSelectField',
  reducer: createReducer(
    initialState,
    on(selectFieldActions.setupFieldConfig, (state, action) => {
      const key = action.fieldConfig.fieldId;
      const newState: SelectFieldState = { ...state };
      newState[key] = {
        ...defaultSelectFieldState,
        fieldConfig: {
          ...action.fieldConfig,
        },
      };
      return {
        ...newState,
      };
    }),
    on(selectFieldActions.setSelectFieldOptions, (state, action) => {
      const key = action.fieldId;
      const newState: SelectFieldState = { ...state };
      newState[key] = {
        ...state[key],
        options: [...action.options],
      };
      //console.log(' 222222 newState option=', newState);
      return {
        ...newState,
      };
    }),
    on(selectFieldActions.clearSelectFieldStore, (state, action) => {
      const key = action.fieldId;
      const newState: SelectFieldState = { ...state };
      delete newState[key];
      //console.log(' 333333  clear State=', newState);
      return {
        ...newState,
      };
    }),
  ),
});
