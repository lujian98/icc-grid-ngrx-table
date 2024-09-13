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
      //console.log(' 00000 init  State=', state);
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
          options: [...action.options],
        };
      }
      //console.log(' rrrrrrrrrr newState option=', newState);
      return { ...newState };
    }),
    on(selectFieldActions.removeSelectFieldStore, (state, action) => {
      // TODO clear store after 250ms
      const key = action.fieldId;
      const newState: SelectFieldState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      console.log(' 333333  clear State key=', key);
      return { ...newState };
    }),
  ),
});
