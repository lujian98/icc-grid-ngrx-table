import { createSelector, createFeatureSelector } from '@ngrx/store';
import { D3State, defaultD3State } from '../models/d3.model';

const featureSelector = createFeatureSelector('iccD3');

export const selectD3Config = (d3Id: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: D3State) => {
      return state[d3Id] ? state[d3Id].d3Config : defaultD3State.d3Config;
    },
  );

export const selectD3ChartConfigs = (d3Id: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: D3State) => {
      return state[d3Id] && state[d3Id].chartConfigs.length > 0 ? state[d3Id].chartConfigs : undefined;
    },
  );

export const selectD3Data = (d3Id: string) =>
  createSelector(
    // @ts-ignore
    featureSelector,
    (state: D3State) => {
      return state[d3Id] ? state[d3Id].data : undefined;
    },
  );
