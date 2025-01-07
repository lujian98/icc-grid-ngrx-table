import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { GridState, IccGridConfig } from '../models/grid-column.model';
import { defaultState } from '../models/default-grid';

const featureSelector = createFeatureSelector('iccGrid');

export const selectGridConfig = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      return state[gridId] ? state[gridId].gridConfig : defaultState.gridConfig;
    },
  );

export const selectColumnsConfig = (gridId: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      return state[gridId] ? state[gridId].columnsConfig : [];
    },
  );

export const selectGridData = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      return state[gridId] ? state[gridId].data : [];
    },
  );

export const selectRowSelection = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      return state[gridId] ? state[gridId].selection : new SelectionModel<any>(false, []);
    },
  );

export const selectAllSelected = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      return state[gridId] ? state[gridId].allSelected : false;
    },
  );

export const selectRowGroups = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      return state[gridId].rowGroups ? state[gridId].rowGroups : true;
    },
  );

export const selectGridInMemoryData = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      return state[gridId] ? state[gridId].inMemoryData : [];
    },
  );
