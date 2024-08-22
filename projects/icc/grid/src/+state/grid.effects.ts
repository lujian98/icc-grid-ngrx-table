import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators'
import { BehaviorSubject, concat, of, Observable, Subject, } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  delay,
  map,
  mergeMap,
  skip,
  switchMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
import * as gridActions from './grid.actions'
import { IccGridService } from '../services/grid.service';
import { IccGridFacade } from './grid.facade';


@Injectable()
export class IccGridEffects {
  private actions$ = inject(Actions);
  private gridFacade = inject(IccGridFacade);
  private gridService = inject(IccGridService);

  setupGridConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.setupGridConfig),
      switchMap((action) => {
        const gridName = action.gridConfig.gridName;
        return this.gridService.getGridConfig(gridName, action.gridConfig).pipe(
          map((gridConfig) => {
            return gridActions.setupGridConfigSuccess({gridName, gridConfig});
          }),
        );
      })
    )
  );

  setupGridColumnConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.setupGridColumnsConfig),
      switchMap((action) => {
        const gridName = action.gridName;
        return this.gridService.getGridColumnsConfig(gridName, action.columnsConfig).pipe(
          map((columnsConfig) => {
            return gridActions.setupGridColumnsConfigSuccess({gridName, columnsConfig});
          }),
        );
      })
    )
  );

  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
      concatLatestFrom((action) => {
        return [this.gridFacade.selectGridConfig(action.gridName),
          this.gridFacade.selectColumnsConfig(action.gridName),
        ];
      }),
      switchMap(([action, gridConfig, columns]) => {
        const gridName = action.gridName;
        return this.gridService.getGridData(gridConfig, columns).pipe(
          map((gridData) => {
            return gridActions.getGridDataSuccess({gridName, gridData});
          }),
        );
      })
    )
  );
}
