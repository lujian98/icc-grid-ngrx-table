import { createFeature, createReducer, on } from '@ngrx/store';

import * as gridActions from './grid.actions';
import { IccGridState, defaultState } from '../models/grid-column.model';

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.setupGridConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...defaultState,
        gridConfig: action.gridConfig,
      };
      console.log( ' setup config state = ', newState)
      return {
        ...newState,
      }
    }),

    on(gridActions.setupGridColumnConfigSuccess, (state, action) => {
      const key = action.gridName;
      const newState: IccGridState = {};
      newState[key] = {
        ...state[key],
        columnConfig: action.columnConfig,
      };
      console.log( ' setup column config state = ', newState)
      return {
        ...newState,
      }
    }),
  ),
});
