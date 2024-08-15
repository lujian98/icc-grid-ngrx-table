import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BehaviorSubject, concat, of, Observable, Subject } from 'rxjs';
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


@Injectable()
export class IccGridEffects {
  private actions$ = inject(Actions);
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
      ofType(gridActions.setupGridColumnConfig),
      switchMap((action) => {
        const gridName = action.gridName;
        return this.gridService.getGridColumnConfig(gridName, action.columnConfig).pipe(
          map((columnConfig) => {
            return gridActions.setupGridColumnConfigSuccess({gridName, columnConfig});
          }),
        );
      })
    )
  );

  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
      switchMap((action) => {
        const gridName = action.gridName;
        return this.gridService.getGridData(gridName, action.gridData).pipe(
          map((gridData) => {
            return gridActions.getGridDataSuccess({gridName, gridData});
          }),
        );
      })
    )
  );
}
