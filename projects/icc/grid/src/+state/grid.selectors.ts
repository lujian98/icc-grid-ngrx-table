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
    //console.log( ' select data jjjjjjjj =', state)
    return state[gridName] ? state[gridName].data : [];
  }
);

export const selectIsFirstPage = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    return state[gridName] && state[gridName].gridConfig.page === 1;
  }
);

export const selectIsLastPage = (gridName: string) => createSelector(
  // @ts-ignore
  featureSelector,
  (state: IccGridState) => {
    let isLastPage = false;
    if(state[gridName]) {
      const st = state[gridName];
      const page = st.gridConfig.page;
      const lastPage = Math.ceil(st.totalCounts / st.gridConfig.pageSize)-1;
      isLastPage = page === lastPage;
    }
    return isLastPage;
  }
);
