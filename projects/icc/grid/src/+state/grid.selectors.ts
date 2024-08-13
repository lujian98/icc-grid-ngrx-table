import { createSelector, createFeatureSelector } from '@ngrx/store';
import { iccGridFeature } from './grid.reducer';
import { IccGridState, defaultState } from '../models/grid-column.model';


export const {
  selectTotal,
} = iccGridFeature;

const featureSelector = createFeatureSelector('iccGrid');

export const selectColumnConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    //console.log( ' state=', state)
    //console.log( ' gridName=', gridName)
    return state[gridName] ? state[gridName].columnConfig : [];
  }
);

export const selectGridConfig = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    console.log( ' 22 state=', state)
    console.log( ' 22gridName=', gridName)
    return state[gridName] ? state[gridName].gridConfig : defaultState.gridConfig;
  }
);
