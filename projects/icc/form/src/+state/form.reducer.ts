import { createFeature, createReducer, on } from '@ngrx/store';
import { IccBUTTONS, IccButtonConfg, IccButtonType } from '@icc/ui/core';
import * as formActions from './form.actions';
import { FormState } from '../models/form.model';
import { defaultFormState } from '../models/default-form';
import { IccFormField, IccFieldsetConfig, defaultBaseField } from '@icc/ui/fields';

export const initialState: FormState = {};

export function getFormEditable(button: IccButtonConfg): boolean {
  switch (button.name) {
    case IccButtonType.Refresh:
    case IccButtonType.View:
      return false;
    case IccButtonType.Edit:
    case IccButtonType.Reset:
    case IccButtonType.Save:
    default:
      return true;
  }
}

export function getFieldEditable(formField: IccFormField, button: IccButtonConfg): boolean {
  switch (button.name) {
    case IccButtonType.Refresh:
    case IccButtonType.View:
      return false;
    case IccButtonType.Edit:
    case IccButtonType.Reset:
    case IccButtonType.Save:
    default:
      return true;
  }
}

export function setFormFieldsEditable(formFields: IccFormField[], button: IccButtonConfg): IccFormField[] {
  return [
    ...formFields.map((field) => {
      if (field.fieldType === 'fieldset') {
        const newfield = field as IccFieldsetConfig;
        return {
          ...field,
          formFields: setFormFieldsEditable(newfield.formFields, button),
        };
      } else {
        if (button.name === IccButtonType.Reset || button.name === IccButtonType.Save) {
          return { ...field };
        } else {
          const editButtons = field.editButtons ? field.editButtons : defaultBaseField.editButtons;
          const editable = editButtons?.find((item) => item === button.name);
          return { ...field, editable };
        }
      }
    }),
  ] as IccFormField[];
}

export const iccFormFeature = createFeature({
  name: 'iccForm',
  reducer: createReducer(
    initialState,
    on(formActions.initFormConfig, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      newState[key] = {
        ...defaultFormState,
        formConfig: { ...action.formConfig },
        formSetting: {
          ...defaultFormState.formSetting,
          formId: action.formId,
        },
      };
      return { ...newState };
    }),
    on(formActions.loadRemoteFormConfigSuccess, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        const formConfig = { ...state[key].formConfig, ...action.formConfig };
        const formFields = setFormFieldsEditable(state[key].formFields, IccBUTTONS.View);
        newState[key] = {
          ...state[key],
          formConfig,
          formFields,
        };
      }
      return { ...newState };
    }),
    on(formActions.loadFormFieldsConfigSuccess, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        const formFields = setFormFieldsEditable(action.formFields, IccBUTTONS.View);
        newState[key] = {
          ...state[key],
          formFields,
        };
      }
      return { ...newState };
    }),
    on(formActions.setFormEditable, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        const editable = getFormEditable(action.button);
        const formConfig = { ...state[key].formConfig, editable };
        const formFields = setFormFieldsEditable(state[key].formFields, action.button);
        newState[key] = {
          ...state[key],
          formConfig,
          formFields,
        };
      }
      return { ...newState };
    }),
    on(formActions.getFormDataSuccess, (state, action) => {
      const key = action.formId;
      const newState: FormState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          formConfig: { ...state[key].formConfig, ...action.formConfig },
          formData: { ...action.formData },
        };
      }
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
