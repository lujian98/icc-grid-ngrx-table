import { createFeature, createReducer, on } from '@ngrx/store';
import * as selectFieldActions from './select-field.actions';

import { IccSelectFieldState } from '../models/select-field.model';
import { defaultSelectFieldState } from '../models/default-select-field';

const initialState: IccSelectFieldState = defaultSelectFieldState;

export const iccSelectFieldFeature = createFeature({
  name: 'iccSelectField',
  reducer: createReducer(
    initialState,
    on(selectFieldActions.setupFieldConfig, (state, { fieldConfig }) => ({
      ...state,
      fieldConfig,
    })),
    /*
    on(selectfieldActions.setupSelectFieldConfigSuccess, (state, action) => {
      const key = action.selectfieldName;
      const newState: IccSelectFieldState = { ...state };
      const selectfieldConfig = {
        ...action.selectfieldConfig,
        pageSize: !action.selectfieldConfig.virtualScroll ? action.selectfieldConfig.pageSize : VIRTUAL_SCROLL_PAGE_SIZE,
      };
      //console.log(' 2222222222 selectfieldConfig=', selectfieldConfig);
      newState[key] = {
        ...defaultState,
        selectfieldConfig,
      };
      return {
        ...newState,
      };
    }),*/
  ),
});
