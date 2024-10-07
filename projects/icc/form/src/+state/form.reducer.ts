import { createFeature, createReducer, on } from '@ngrx/store';
import * as formActions from './form.actions';
import { FormState, IccFormButtonType } from '../models/form.model';
import { defaultFormState } from '../models/default-form';
import { IccFormField, IccFieldsetConfig, defaultBaseField, IccFormButtonConfg } from '@icc/ui/fields';

export const initialState: FormState = {};

const viewButton = {
  name: IccFormButtonType.View,
  title: 'View',
};

export function getFormEditable(button: IccFormButtonConfg): boolean {
  switch (button.name) {
    case IccFormButtonType.Refresh:
    case IccFormButtonType.View:
      return false;
    case IccFormButtonType.Edit:
    case IccFormButtonType.Reset:
    case IccFormButtonType.Save:
    default:
      return true;
  }
}

export function getFieldEditable(formField: IccFormField, button: IccFormButtonConfg): boolean {
  switch (button.name) {
    case IccFormButtonType.Refresh:
    case IccFormButtonType.View:
      return false;
    case IccFormButtonType.Edit:
    case IccFormButtonType.Reset:
    case IccFormButtonType.Save:
    default:
      return true;
  }
}

export function setFormFieldsEditable(formFields: IccFormField[], button: IccFormButtonConfg): IccFormField[] {
  return [
    ...formFields.map((field) => {
      if (field.fieldType === 'fieldset') {
        const newfield = field as IccFieldsetConfig;
        return {
          ...field,
          formFields: setFormFieldsEditable(newfield.formFields, button),
        };
      } else {
        if (button.name === IccFormButtonType.Reset || button.name === IccFormButtonType.Save) {
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
        const formFields = setFormFieldsEditable(state[key].formFields, viewButton);
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
        const formFields = setFormFieldsEditable(action.formFields, viewButton);
        newState[key] = {
          ...state[key],
          formFields,
        };
      }
      //console.log(' FormFieldsConfig sucess=', newState[key]);
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
      //console.log(' FormFieldsConfig sucess=', newState[key]);
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
