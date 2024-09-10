import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, switchMap, debounceTime } from 'rxjs/operators';
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
      ofType(gridActions.setupGridConfig),
      switchMap((action) => {
        const gridId = action.gridConfig.gridId;
        return this.gridService.getGridConfig(gridId, action.gridConfig).pipe(
          map((gridConfig) => {
            return gridActions.setupGridConfigSuccess({ gridId, gridConfig });
            /*
            if(gridConfig.remoteColumnsConfig) {
              const columnsConfig: any[] = [];
              console.log(' 111111111111111 columnsConfig=')
              this.store.dispatch(gridActions.setupGridConfigSuccess({ gridId, gridConfig }));
              console.log(' 22222222222222222 columnsConfig=')
              return gridActions.setupGridColumnsConfig({ gridConfig, columnsConfig });
            } else {
              return gridActions.setupGridConfigSuccess({ gridId, gridConfig });
            }*/
          }),
        );
      }),
    ),
  );

  setupGridColumnConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.setupGridColumnsConfig),
      switchMap((action) => {
        const gridConfig = action.gridConfig;
        return this.gridService.getGridColumnsConfig(gridConfig, action.columnsConfig).pipe(
          map((columnsConfig) => {
            this.store.dispatch(gridActions.setupGridColumnsConfigSuccess({ gridConfig, columnsConfig }));
            return gridActions.getGridData({ gridId: gridConfig.gridId });
            //return gridActions.setupGridColumnsConfigSuccess({ gridConfig, columnsConfig });
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
}
