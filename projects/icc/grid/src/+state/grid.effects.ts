import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { debounceTime, concatMap, delay, map, of, switchMap } from 'rxjs';
import { IccGridinMemoryService } from '../services/grid-in-memory.service';
import { IccGridService } from '../services/grid.service';
import * as gridActions from './grid.actions';
import { IccGridFacade } from './grid.facade';

@Injectable()
export class IccGridEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private gridFacade = inject(IccGridFacade);
  private gridService = inject(IccGridService);
  private gridinMemoryService = inject(IccGridinMemoryService);

  setupGridConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.loadGridConfig),
      switchMap((action) => {
        return this.gridService.getGridConfig(action.gridConfig).pipe(
          map((gridConfig) => {
            if (gridConfig.remoteColumnsConfig) {
              this.store.dispatch(gridActions.loadGridConfigSuccess({ gridConfig }));
              //console.log( ' gridConfig loaded ')
              return gridActions.loadGridColumnsConfig({ gridConfig });
            } else {
              return gridActions.loadGridConfigSuccess({ gridConfig });
            }
          }),
        );
      }),
    ),
  );

  loadGridColumnsConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.loadGridColumnsConfig),
      switchMap((action) => {
        const gridConfig = action.gridConfig;
        return this.gridService.getGridColumnsConfig(gridConfig).pipe(
          map((columnsConfig) => {
            //console.log( ' loadGridColumnsConfig loaded ')
            if (gridConfig.remoteGridConfig) {
              // remote config will need trigger window resize to load data
              window.dispatchEvent(new Event('resize'));
              return gridActions.loadGridColumnsConfigSuccess({ gridConfig, columnsConfig });
            } else {
              this.store.dispatch(gridActions.loadGridColumnsConfigSuccess({ gridConfig, columnsConfig }));
              return gridActions.getGridData({ gridId: gridConfig.gridId });
            }
          }),
        );
      }),
    ),
  );

  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
      debounceTime(10),
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.gridId),
          this.gridFacade.selectColumnsConfig(action.gridId),
          this.gridFacade.selectGridInMemoryData(action.gridId),
        ];
      }),
      switchMap(([action, gridConfig, columns, inMemoryData]) => {
        const gridId = action.gridId;
        if (gridConfig.remoteGridData) {
          return this.gridService.getGridData(gridConfig, columns).pipe(
            map((gridData) => {
              //console.log( ' remoteGridData loaded ')
              return gridActions.getGridDataSuccess({ gridId, gridData });
            }),
          );
        } else {
          return this.gridinMemoryService.getGridData(gridConfig, columns, inMemoryData).pipe(
            map((gridData) => {
              return gridActions.getGridDataSuccess({ gridId, gridData });
            }),
          );
        }
      }),
    ),
  );

  clearGridDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.clearGridDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      concatMap(({ gridId }) => of(gridId).pipe(map((gridId) => gridActions.removeGridDataStore({ gridId })))),
    ),
  );
}
