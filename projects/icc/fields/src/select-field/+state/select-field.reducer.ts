import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultSelectFieldState } from '../models/default-select-field';
import { SelectFieldState } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';

export const initialState: SelectFieldState = {};

export const iccSelectFieldFeature = createFeature({
  name: 'iccSelectField',
  reducer: createReducer(
    initialState,
    on(selectFieldActions.initFieldConfig, (state, action) => {
      const fieldConfig = { ...action.fieldConfig };
      const key = fieldConfig.fieldId;
      const newState: SelectFieldState = { ...state };
      newState[key] = {
        ...defaultSelectFieldState,
        fieldConfig: {
          ...fieldConfig,
          viewportReady: !fieldConfig.remoteConfig && !fieldConfig.remoteOptions,
        },
      };
      return { ...newState };
    }),
    on(selectFieldActions.loadFieldConfigSuccess, (state, action) => {
      const fieldConfig = { ...action.fieldConfig };
      const key = fieldConfig.fieldId;
      const newState: SelectFieldState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          fieldConfig: {
            ...fieldConfig,
            viewportReady: !fieldConfig.remoteOptions,
          },
        };
      }
      return { ...newState };
    }),
    on(selectFieldActions.loadSelectFieldOptionsSuccess, (state, action) => {
      const key = action.fieldId;
      const newState: SelectFieldState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          fieldConfig: {
            ...state[key].fieldConfig,
            viewportReady: true,
          },
          options: [...action.options] as string[] | object[],
        };
      }
      return { ...newState };
    }),
    on(selectFieldActions.removeSelectFieldStore, (state, action) => {
      const key = action.fieldId;
      const newState: SelectFieldState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
