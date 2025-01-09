import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { IccRowGroup } from '../services/row-group/row-group';
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
      if (state[gridId]) {
        console.log(' data=', state[gridId].data);
      }
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

export const selectRowSelections = (gridConfig: IccGridConfig) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: GridState) => {
      const gridId = gridConfig.gridId;
      if (state[gridId]) {
        const oldState = state[gridId];
        const selection = oldState.selection;
        const dataCounts = oldState.data.filter((item) => item && !(item instanceof IccRowGroup)).length;
        const allSelected = selection.selected.length === dataCounts && dataCounts > 0;
        return {
          selection,
          allSelected,
          indeterminate: selection.hasValue() && !allSelected,
        };
      } else {
        return {
          selection: new SelectionModel<any>(false, []),
          allSelected: false,
          indeterminate: false,
        };
      }
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
