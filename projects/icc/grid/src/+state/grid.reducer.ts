import { createFeature, createReducer, on } from '@ngrx/store';

import * as gridActions from './grid.actions'
import { IccColumnConfig, IccGridConfig, IccGridState, GridState, defaultState } from '../models/grid-column.model';

export const initialState: IccGridState = {};

export const iccGridFeature = createFeature({
  name: 'iccGrid',
  reducer: createReducer(
    initialState,
    on(gridActions.setupGridConfig, (state, action) => {
      const key = action.gridConfig.gridName;
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

    on(gridActions.setupGridColumnConfig, (state, action) => {
      const key = action.gridName;
      const gridState: GridState = {
        ...state[key],
        columnConfig: action.columnConfig,
      };
      gridState.columnConfig = action.columnConfig;
      const newState: IccGridState = {};
      newState[key] = gridState;
      console.log( ' setup column config state = ', newState)
      return {
        ...newState,
      }
    }),
  ),
});
