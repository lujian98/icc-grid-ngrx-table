import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormState } from '../models/form.model';
import { defaultFormState } from '../models/default-form';

const featureSelector = createFeatureSelector('iccForm');

export const selectFormConfig = (formId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: FormState) => {
      return state[formId] ? state[formId].formConfig : defaultFormState.formConfig;
    },
  );
