import { createFeature, createReducer, on } from '@ngrx/store';
import * as formPanelActions from './form-panel.actions';
import { FormPanelState } from '../models/form-panel.model';
import { defaultFormPanelState } from '../models/default-form-panel';

export const initialState: FormPanelState = {};

export const iccFormPanelFeature = createFeature({
  name: 'iccFormPanel',
  reducer: createReducer(
    initialState,
    on(formPanelActions.initFormPanelConfig, (state, action) => {
      const formPanelConfig = { ...action.formPanelConfig };
      const key = formPanelConfig.formPanelId;
      const newState: FormPanelState = { ...state };
      newState[key] = {
        ...defaultFormPanelState,
        formPanelConfig,
      };
      console.log(' init form state =', newState);
      return { ...newState };
    }),

    on(formPanelActions.removeFormPanelDataStore, (state, action) => {
      const key = action.formPanelId;
      const newState: FormPanelState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
