import { createSelector, createFeatureSelector } from '@ngrx/store';
//const featureSelector = createFeatureSelector('iccSelectField');
import { iccSelectFieldFeature } from './select-field.reducer';

export const { selectFieldConfig, selectData } = iccSelectFieldFeature;
