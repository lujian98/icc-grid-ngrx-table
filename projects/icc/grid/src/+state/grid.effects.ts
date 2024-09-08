import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, switchMap } from 'rxjs/operators';
import { IccGridinMemoryService } from '../services/grid-in-memory.service';
import { IccGridService } from '../services/grid.service';
import * as gridActions from './grid.actions';
import { IccGridFacade } from './grid.facade';

@Injectable()
export class IccGridEffects {
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
          }),
        );
      }),
    ),
  );

  setupGridColumnConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.setupGridColumnsConfig),
      switchMap((action) => {
        const gridId = action.gridId;
        return this.gridService.getGridColumnsConfig(gridId, action.columnsConfig).pipe(
          map((columnsConfig) => {
            return gridActions.setupGridColumnsConfigSuccess({
              gridId,
              columnsConfig,
            });
          }),
        );
      }),
    ),
  );

  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
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
