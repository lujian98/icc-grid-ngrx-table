import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SelectFieldState } from '../models/select-field.model';

const featureSelector = createFeatureSelector('iccSelectField');

export const selectFieldConfig = (fieldId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: SelectFieldState) => {
      return state[fieldId] ? state[fieldId].fieldConfig : undefined;
    },
  );

export const selectOptions = (fieldId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: SelectFieldState) => {
      return state[fieldId] ? state[fieldId].options : [];
    },
  );
