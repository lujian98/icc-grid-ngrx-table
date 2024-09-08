import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IccGridState } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';

const featureSelector = createFeatureSelector('iccGrid');

export const selectGridConfig = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridId] ? state[gridId].gridConfig : defaultState.gridConfig;
    },
  );

export const selectColumnsConfig = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridId] ? state[gridId].columnsConfig : [];
    },
  );

export const selectGridData = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridId] ? state[gridId].data : [];
    },
  );

export const selectGridInMemoryData = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: IccGridState) => {
      return state[gridId] ? state[gridId].inMemoryData : [];
    },
  );
