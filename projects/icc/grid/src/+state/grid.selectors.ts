import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IccGridState } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';

const featureSelector = createFeatureSelector('iccGrid');

export const selectGridConfig = (gridName: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridName] ? state[gridName].gridConfig : defaultState.gridConfig;
    },
  );

export const selectColumnsConfig = (gridName: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridName] ? state[gridName].columnsConfig : [];
    },
  );

export const selectGridData = (gridName: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridName] ? state[gridName].data : [];
    },
  );

export const selectGridInMemoryData = (gridName: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridName] ? state[gridName].inMemoryData : [];
    },
  );
