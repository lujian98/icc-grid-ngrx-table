import { createAction, props } from '@ngrx/store';
import { IccButtonConfg } from '@icc/ui/core';
import { IccFormConfig } from '../models/form.model';
import { IccFormField } from '@icc/ui/fields';

export const initFormConfig = createAction(
  '[Form] Init Form Panel Config',
  props<{ formId: string; formConfig: IccFormConfig }>(),
);

export const loadRemoteFormConfig = createAction(
  '[Form] Load Remote Form Config',
  props<{ formId: string; formConfig: IccFormConfig }>(),
);

export const loadRemoteFormConfigSuccess = createAction(
  '[Form] Load Remote Form Config Success',
  props<{ formId: string; formConfig: IccFormConfig }>(),
);

export const loadFormFieldsConfig = createAction(
  '[Form] Load Remote Form Fields Config',
  props<{ formId: string; formConfig: IccFormConfig }>(),
);

export const loadFormFieldsConfigSuccess = createAction(
  '[Form] Load Remote Form Fields Config Success',
  props<{ formId: string; formConfig: IccFormConfig; formFields: IccFormField[] }>(),
);

export const setFormEditable = createAction(
  '[Form] Set Form Editable',
  props<{ formId: string; button: IccButtonConfg }>(),
);

export const getFormData = createAction('[Form] Get Form Data', props<{ formId: string; formConfig: IccFormConfig }>());

export const getFormDataSuccess = createAction(
  '[Form] Get Form Data Success',
  props<{ formId: string; formConfig: IccFormConfig; formData: object }>(),
);

export const saveFormData = createAction(
  '[Form] Save Form Data',
  props<{ formId: string; formConfig: IccFormConfig; formData: object }>(),
);

export const saveFormDataSuccess = createAction(
  '[Form] Save Form Data Success',
  props<{ formId: string; formConfig: IccFormConfig; formData: object }>(),
);

/*
export const uploadFiles = createAction(
  '[Form] Upload Files',
  props<{ formConfig: IccFormConfig; files: IccUploadFile[] }>(),
);

export const uploadFilesSuccess = createAction('[Form] Upload Files Success', props<{ formConfig: IccFormConfig }>());
*/

export const clearFormDataStore = createAction('[Form] Clear Form Panel Data Store', props<{ formId: string }>());
export const removeFormDataStore = createAction('[Form] Remove Form Panel Data Store', props<{ formId: string }>());
