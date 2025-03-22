import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, ReducerManager } from '@ngrx/store';

import { concatMap, delay, map, mergeMap, of } from 'rxjs';
//import { IccDashboardService } from '../services/dashboard.service';
import * as dashboardActions from './dashboard.actions';

@Injectable()
export class IccDashboardEffects {
  private store = inject(Store);
  private reducerManager = inject(ReducerManager);
  private actions$ = inject(Actions);
  //private dashboardService = inject(IccDashboardService);

  /*
  getRemoteDashboardConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.loadRemoteDashboardConfig),
      concatMap(({ dashboardId, dashboardConfig }) => {
        return this.dashboardService.getRemoteDashboardConfig(dashboardConfig).pipe(
          map((dashboardConfig) => {
            this.store.dispatch(dashboardActions.loadDashboardConfigSuccess({ dashboardId, dashboardConfig }));
            return dashboardActions.loadDashboardOptions({ dashboardId, dashboardConfig });
          }),
        );
      }),
    ),
  );

  loadDashboardOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.loadDashboardOptions),
      concatMap(({ dashboardId, dashboardConfig }) => {
        return this.dashboardService.getDashboardOptions(dashboardConfig).pipe(
          map((options) => {
            return dashboardActions.loadDashboardOptionsSuccess({ dashboardId, options });
          }),
        );
      }),
    ),
  );
*/
  clearDashboardStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.clearDashboardStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ dashboardId }) =>
        of(dashboardId).pipe(
          map((dashboardId) => {
            this.reducerManager.removeReducer(dashboardId);
            return dashboardActions.removeDashboardStore({ dashboardId });
          }),
        ),
      ),
    ),
  );
}
