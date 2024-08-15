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

  /*
  map(action => action.payload),
mergeMap((id) =>
    of(id).pipe(
        withLatestFrom(
            this.store.pipe(select(state => getEntityById(state, id))),
            this.store.pipe(select(state => getWhateverElse(state)))
        )
    ),
    (id, latestStoreData) => latestStoreData
),
switchMap(([id, entity, whateverElse]) => callService(entity))

loadLocalSubServices$: Observable<Action> = this.actions$.pipe(
    ofType(LocalSubServiceTemplateActions.LocalSubServicesTemplateActionTypes.LoadLocalSubService),
    map((action: LocalSubServiceTemplateActions.LoadLocalSubService) => action.payload.globalSubServiceId),
    (globalSubServiceId) => {
        return withLatestFrom(this.store.pipe(select(fromLocalSubservices.getSearchParams(globalSubServiceId))));
    },
    map(searchParams => searchParams[1]),
    mergeMap((params) =>
      this.subServiceService.getLocalSubServices(params).pipe(
        map(localSubServices => (new LocalSubServiceTemplateActions.LocalSubServiceLoadSuccess(localSubServices))),
        catchError(err => of(new LocalSubServiceTemplateActions.LocalSubServiceLoadFail(err)))
      )
    )
  );

  class Effect {
  detail$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductDetailPage.loaded),
      concatLatestFrom(() => this.store.select(selectProducts)),
      mergeMap(([action, products]) => {
        ...
      })
    )
  })
}

public readonly something$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(someAction),
        concatLatestFrom(() => [
          this.store.select(selectFoo),
          this.store.select(selectBar),
        ]),
        switchMap(([action, foo, bar]) => {

          // Do what you need

        }),
      ),
  );

*/
  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
      concatLatestFrom((action) => {
        console.log( ' yyyyyyyyyyyy concat action=', action)
        return of(true);
      }),
      switchMap(([action, data]) => {
        console.log( ' concat last =', data);
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
