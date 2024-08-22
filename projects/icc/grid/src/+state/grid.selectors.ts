import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IccGridState, defaultState } from '../models/grid-column.model';

const featureSelector = createFeatureSelector('iccGrid');

export const selectGridConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].gridConfig : defaultState.gridConfig;
  }
);

export const selectColumnsConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].columnsConfig : [];
  }
);

export const selectGridData = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].data : [];
  }
);
