import { createAction, props } from '@ngrx/store';

import { IccFormConfig } from '../models/form.model';

export const initFormConfig = createAction('[Form] Init Form Panel Config', props<{ formConfig: IccFormConfig }>());

export const loadRemoteFormConfig = createAction(
  '[Form] Load Remote Form Config',
  props<{ formConfig: IccFormConfig }>(),
);

export const loadRemoteFormConfigSuccess = createAction(
  '[Form] Load Remote Form Config Success',
  props<{ formConfig: IccFormConfig }>(),
);

export const loadFormFieldsConfig = createAction(
  '[Form] Load Remote Form Fields Config',
  props<{ formConfig: IccFormConfig }>(),
);

export const loadFormFieldsConfigSuccess = createAction(
  '[Form] Load Remote Form Fields Config Success',
  props<{ formConfig: IccFormConfig; formFields: any[] }>(),
);

export const getFormData = createAction('[Form] Get Form Data', props<{ formId: string }>());

export const getFormDataSuccess = createAction(
  '[Form] Get Form Data Success',
  props<{ formConfig: IccFormConfig; formData: any }>(),
);

export const clearFormDataStore = createAction('[Form] Clear Form Panel Data Store', props<{ formId: string }>());
export const removeFormDataStore = createAction('[Form] Remove Form Panel Data Store', props<{ formId: string }>());
