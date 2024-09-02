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
        const gridName = action.gridConfig.gridName;
        return this.gridService.getGridConfig(gridName, action.gridConfig).pipe(
          map((gridConfig) => {
            return gridActions.setupGridConfigSuccess({ gridName, gridConfig });
          }),
        );
      }),
    ),
  );

  setupGridColumnConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.setupGridColumnsConfig),
      switchMap((action) => {
        const gridName = action.gridName;
        return this.gridService
          .getGridColumnsConfig(gridName, action.columnsConfig)
          .pipe(
            map((columnsConfig) => {
              return gridActions.setupGridColumnsConfigSuccess({
                gridName,
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
          this.gridFacade.selectGridConfig(action.gridName),
          this.gridFacade.selectColumnsConfig(action.gridName),
          this.gridFacade.selectGridInMemoryData(action.gridName),
        ];
      }),
      switchMap(([action, gridConfig, columns, inMemoryData]) => {
        const gridName = action.gridName;
        if (gridConfig.remoteGridData) {
          return this.gridService.getGridData(gridConfig, columns).pipe(
            map((gridData) => {
              return gridActions.getGridDataSuccess({ gridName, gridData });
            }),
          );
        } else {
          return this.gridinMemoryService
            .getGridData(gridConfig, columns, inMemoryData)
            .pipe(
              map((gridData) => {
                return gridActions.getGridDataSuccess({ gridName, gridData });
              }),
            );
        }
      }),
    ),
  );
}
