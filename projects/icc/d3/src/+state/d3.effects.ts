import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, delay, map, mergeMap, of, switchMap } from 'rxjs';
import { IccD3Service } from '../services/d3.service';
import * as d3Actions from './d3.actions';
import { IccD3Facade } from './d3.facade';

@Injectable()
export class IccD3Effects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private d3Service = inject(IccD3Service);

  loadRemoteD3Config$ = createEffect(() =>
    this.actions$.pipe(
      ofType(d3Actions.loadRemoteD3Config),
      concatMap(({ d3Config }) => {
        return this.d3Service.getRemoteD3Config(d3Config).pipe(
          map((d3Config) => {
            if (d3Config.remoteChartConfigs) {
              this.store.dispatch(d3Actions.loadRemoteD3ConfigSuccess({ d3Config }));
              return d3Actions.loadD3ChartConfigs({ d3Config });
            } else {
              return d3Actions.loadRemoteD3ConfigSuccess({ d3Config });
            }
          }),
        );
      }),
    ),
  );

  loadD3ChartConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(d3Actions.loadD3ChartConfigs),
      concatMap((action) => {
        const d3Config = action.d3Config;
        return this.d3Service.getD3ChartConfigs(d3Config).pipe(
          map((chartConfigs) => {
            if (d3Config.remoteD3Data) {
              this.store.dispatch(d3Actions.loadD3ChartConfigsSuccess({ d3Config, chartConfigs }));
              return d3Actions.getD3Data({ d3Config });
            } else {
              return d3Actions.loadD3ChartConfigsSuccess({ d3Config, chartConfigs });
            }
          }),
        );
      }),
    ),
  );

  getD3Data$ = createEffect(() =>
    this.actions$.pipe(
      ofType(d3Actions.getD3Data),
      concatMap(({ d3Config }) => {
        return this.d3Service.getD3Data(d3Config).pipe(
          map((data) => {
            return d3Actions.getD3DataSuccess({ d3Config, data });
          }),
        );
      }),
    ),
  );

  clearD3DataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(d3Actions.clearD3DataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ d3Id }) => of(d3Id).pipe(map((d3Id) => d3Actions.removeD3DataStore({ d3Id })))),
    ),
  );
}
