import { createAction, props } from '@ngrx/store';

import { IccFormPanelConfig } from '../models/form-panel.model';

export const initFormPanelConfig = createAction(
  '[FormPanel] Init Form Panel Config',
  props<{ formPanelConfig: IccFormPanelConfig }>(),
);

/*

export const loadFormPanelConfig = createAction('[FormPanel] Load FormPanel Config', props<{ formpanelConfig: IccFormPanelConfig }>());

export const loadFormPanelConfigSuccess = createAction(
  '[FormPanel] Load FormPanel Config Success',
  props<{ formpanelConfig: IccFormPanelConfig }>(),
);

export const getFormPanelData = createAction('[FormPanel] Get FormPanel Data', props<{ formpanelId: string }>());

export const getFormPanelDataSuccess = createAction(
  '[FormPanel] Get FormPanel Data Success',
  props<{ formpanelId: string; formpanelData: IccFormPanelData<any> }>(),
);
*/

export const clearFormPanelDataStore = createAction(
  '[FormPanel] Clear Form Panel Data Store',
  props<{ formPanelId: string }>(),
);
export const removeFormPanelDataStore = createAction(
  '[FormPanel] Remove Form Panel Data Store',
  props<{ formPanelId: string }>(),
);
