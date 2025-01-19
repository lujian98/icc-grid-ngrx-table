import { createSelector } from '@ngrx/store';
import { SelectFieldState } from '../models/select-field.model';

//const featureSelector = createFeatureSelector('iccSelectField');

export interface AppSelectState {
  iccSelectField: SelectFieldState;
}

export const featureSelector = (state: AppSelectState) => state.iccSelectField;

export const selectFieldConfig = (fieldId: string) =>
  createSelector(featureSelector, (state: SelectFieldState) => {
    const fieldConfig = state[fieldId] ? state[fieldId].fieldConfig : undefined;
    return fieldConfig && fieldConfig.viewportReady ? fieldConfig : undefined;
  });

export const selectOptions = (fieldId: string) =>
  createSelector(featureSelector, (state: SelectFieldState) => {
    return state[fieldId] ? state[fieldId].options : [];
  });
