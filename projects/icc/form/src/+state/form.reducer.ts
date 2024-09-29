import { createFeature, createReducer, on } from '@ngrx/store';
import * as formActions from './form.actions';
import { FormState } from '../models/form.model';
import { defaultFormState } from '../models/default-form';

export const initialState: FormState = {};

export const iccFormFeature = createFeature({
  name: 'iccForm',
  reducer: createReducer(
    initialState,
    on(formActions.initFormConfig, (state, action) => {
      const formConfig = { ...action.formConfig };
      const key = formConfig.formId;
      const newState: FormState = { ...state };
      newState[key] = {
        ...defaultFormState,
        formConfig,
      };
      //console.log(' init form state =', newState);
      return { ...newState };
    }),
    on(formActions.loadRemoteFormConfigSuccess, (state, action) => {
      const key = action.formConfig.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          formConfig: { ...state[key].formConfig, ...action.formConfig },
        };
      } // TODO apply editable for FormFields
      //console.log('xxxxxxxxxxxxxx load remote formData = ', newState[key]);
      return { ...newState };
    }),
    on(formActions.loadFormFieldsConfigSuccess, (state, action) => {
      const key = action.formConfig.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          formFields: [...action.formFields],
        };
      } // TODO apply editable for FormFields
      //console.log(' FormFieldsConfig sucess=', newState);
      return { ...newState };
    }),
    on(formActions.getFormDataSuccess, (state, action) => {
      const key = action.formConfig.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          formConfig: { ...state[key].formConfig, ...action.formConfig },
          formData: { ...action.formData },
        };
      }
      //console.log('load remote formData = ', newState[key]);
      return { ...newState };
    }),
    on(formActions.removeFormDataStore, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
