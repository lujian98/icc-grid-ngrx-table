import { createSelector } from '@ngrx/store';
import { SelectFieldState } from '../models/select-field.model';

export interface AppSelectState {
  iccSelectField: SelectFieldState;
}

export const featureSelector = (state: AppSelectState) => state.iccSelectField;

export const selectFieldSetting = (fieldId: string) =>
  createSelector(featureSelector, (state: SelectFieldState) => {
    const fieldSetting = state[fieldId] ? state[fieldId].fieldSetting : undefined;
    return fieldSetting && fieldSetting.viewportReady ? fieldSetting : undefined;
  });

export const selectFieldConfig = (fieldId: string) =>
  createSelector(featureSelector, (state: SelectFieldState) => {
    const fieldConfig = state[fieldId] ? state[fieldId].fieldConfig : undefined;
    return fieldConfig && state[fieldId].fieldSetting.viewportReady ? fieldConfig : undefined;
  });

export const selectOptions = (fieldId: string) =>
  createSelector(featureSelector, (state: SelectFieldState) => {
    return state[fieldId] ? state[fieldId].options : [];
  });
