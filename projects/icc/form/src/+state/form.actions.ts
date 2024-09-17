import { createAction, props } from '@ngrx/store';

import { IccFormConfig } from '../models/form.model';

export const initFormConfig = createAction('[Form] Init Form Panel Config', props<{ formConfig: IccFormConfig }>());

/*

export const loadFormConfig = createAction('[Form] Load Form Config', props<{ formConfig: IccFormConfig }>());

export const loadFormConfigSuccess = createAction(
  '[Form] Load Form Config Success',
  props<{ formConfig: IccFormConfig }>(),
);

export const getFormData = createAction('[Form] Get Form Data', props<{ formId: string }>());

export const getFormDataSuccess = createAction(
  '[Form] Get Form Data Success',
  props<{ formId: string; formData: IccFormData<any> }>(),
);
*/

export const clearFormDataStore = createAction('[Form] Clear Form Panel Data Store', props<{ formId: string }>());
export const removeFormDataStore = createAction('[Form] Remove Form Panel Data Store', props<{ formId: string }>());
