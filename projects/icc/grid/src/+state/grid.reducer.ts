import { createFeature, createReducer, on } from '@ngrx/store';

import * as gridActions from './grid.actions'
//import { AuditLog } from '../models/audit-log.model';

export interface IccGridState {
  total: number;
}

export const initialState: IccGridState = {
  total: 0,
};

export const iccGridFeature = createFeature({
  name: 'grid',
  reducer: createReducer(
    initialState,

  ),
});
