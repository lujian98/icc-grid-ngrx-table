import { createFeature, createReducer, on } from '@ngrx/store';
import * as formActions from './form.actions';
import { FormState } from '../models/form.model';
import { defaultFormState } from '../models/default-form';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';

export const initialState: FormState = {};

export function setFormFieldsEditable(formFields: IccFormField[], editable: boolean): IccFormField[] {
  return [
    ...formFields.map((field) => {
      if (field.fieldType === 'fieldset') {
        const newfield = field as IccFieldsetConfig;
        return {
          ...field,
          formFields: setFormFieldsEditable(newfield.formFields, editable),
        };
      } else {
        return {
          ...field,
          editable,
        };
      }
    }),
  ];
}

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
        const formConfig = { ...state[key].formConfig, ...action.formConfig };
        const editable = formConfig.editable;
        const formFields = setFormFieldsEditable(state[key].formFields, editable);
        newState[key] = {
          ...state[key],
          formConfig,
          formFields,
        };
      }
      //console.log('xxxxxxxxxxxxxx load remote formData = ', newState[key]);
      return { ...newState };
    }),
    on(formActions.loadFormFieldsConfigSuccess, (state, action) => {
      const key = action.formConfig.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        const editable = state[key].formConfig.editable;
        const formFields = setFormFieldsEditable(action.formFields, editable);
        newState[key] = {
          ...state[key],
          formFields,
        };
      } // TODO apply editable for FormFields
      console.log(' FormFieldsConfig sucess=', newState[key]);
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
