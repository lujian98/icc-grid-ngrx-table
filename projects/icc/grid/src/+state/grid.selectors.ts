import { createSelector, createFeatureSelector } from '@ngrx/store';
import { iccGridFeature } from './grid.reducer';
import { IccGridState, defaultState } from '../models/grid-column.model';


export const {
  selectTotal,
} = iccGridFeature;

const featureSelector = createFeatureSelector('iccGrid');

export const selectGridConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].gridConfig : defaultState.gridConfig;
  }
);

export const selectColumnConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].columnConfig : [];
  }
);

export const selectGridData = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] ? state[gridName].data : [];
  }
);
