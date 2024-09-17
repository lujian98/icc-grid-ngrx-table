import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormPanelState } from '../models/form-panel.model';
import { defaultFormPanelState } from '../models/default-form-panel';

const featureSelector = createFeatureSelector('iccFormPanel');

export const selectFormPanelConfig = (formPanelId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: FormPanelState) => {
      return state[formPanelId] ? state[formPanelId].formPanelConfig : defaultFormPanelState.formPanelConfig;
    },
  );
