import { Injectable, inject } from '@angular/core';
import { IccDialogService } from '@icc/ui/overlay';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, delay, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { IccGridFormViewComponent } from '../components/form-view/form-view.component';
import { IccColumnConfig, IccGridConfig } from '../models/grid-column.model';
import { IccGridinMemoryService } from '../services/grid-in-memory.service';
import { IccGridService } from '../services/grid.service';
import * as gridActions from './grid.actions';
import { IccGridFacade } from './grid.facade';

@Injectable()
export class IccGridEffects {
  private readonly store = inject(Store);
  private readonly dialogService = inject(IccDialogService);
  private readonly actions$ = inject(Actions);
  private readonly gridFacade = inject(IccGridFacade);
  private readonly gridService = inject(IccGridService);
  private readonly gridinMemoryService = inject(IccGridinMemoryService);

  setupGridConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.loadGridConfig),
      concatMap((action) => {
        return this.gridService.getGridConfig(action.gridConfig).pipe(
          map((gridConfig) => {
            const gridId = action.gridId;
            if (gridConfig.remoteColumnsConfig) {
              this.store.dispatch(gridActions.loadGridConfigSuccess({ gridId, gridConfig }));
              return gridActions.loadGridColumnsConfig({ gridId });
            } else {
              if (gridConfig.rowGroupField) {
                this.gridFacade.initRowGroup(gridId, gridConfig);
              } else {
                window.dispatchEvent(new Event('resize'));
              }
              return gridActions.loadGridConfigSuccess({ gridId, gridConfig });
            }
          }),
        );
      }),
    ),
  );

  loadGridColumnsConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.loadGridColumnsConfig),
      concatLatestFrom((action) => {
        return [this.gridFacade.selectSetting(action.gridId), this.gridFacade.selectGridConfig(action.gridId)];
      }),
      concatMap(([action, gridSetting, gridConfig]) => {
        const gridId = action.gridId;
        return this.gridService.getGridColumnsConfig(gridConfig).pipe(
          map((columnsConfig) => {
            const isTreeGrid = gridSetting.isTreeGrid;
            if (gridConfig.rowGroupField) {
              this.gridFacade.initRowGroup(gridId, gridConfig);
              return gridActions.loadGridColumnsConfigSuccess({ gridId, gridConfig, isTreeGrid, columnsConfig });
            } else if (gridConfig.remoteGridConfig || gridSetting.isTreeGrid) {
              // remote config will need trigger window resize to load data
              window.dispatchEvent(new Event('resize'));
              return gridActions.loadGridColumnsConfigSuccess({ gridId, gridConfig, isTreeGrid, columnsConfig });
            } else if (!gridSetting.isTreeGrid) {
              this.store.dispatch(
                gridActions.loadGridColumnsConfigSuccess({ gridId, gridConfig, isTreeGrid, columnsConfig }),
              );
              return gridActions.getConcatGridData({ gridId });
            } else {
              // TODO tree need load local data?
              return gridActions.loadGridColumnsConfigSuccess({ gridId, gridConfig, isTreeGrid, columnsConfig });
            }
          }),
        );
      }),
    ),
  );

  getGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getGridData),
      debounceTime(10), // debounce with switchMap may lose data if two or more grid pull, but will cancel previous call
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.gridId),
          this.gridFacade.selectColumnsConfig(action.gridId),
          this.gridFacade.selectGridInMemoryData(action.gridId),
        ];
      }),
      switchMap(([action, gridConfig, columns, inMemoryData]) => {
        return this.getGridData(action.gridId, gridConfig, columns, inMemoryData);
      }),
    ),
  );

  getConcatGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.getConcatGridData),
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.gridId),
          this.gridFacade.selectColumnsConfig(action.gridId),
          this.gridFacade.selectGridInMemoryData(action.gridId),
        ];
      }),
      mergeMap(([action, gridConfig, columns, inMemoryData]) => {
        return this.getGridData(action.gridId, gridConfig, columns, inMemoryData);
      }),
    ),
  );

  private getGridData = (
    gridId: string,
    gridConfig: IccGridConfig,
    columns: IccColumnConfig[],
    inMemoryData: unknown[],
  ) => {
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
  };

  saveGridModifiedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.saveGridModifiedRecords),
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.gridId),
          this.gridFacade.selectGridModifiedRecords(action.gridId),
        ];
      }),
      concatMap(([action, gridConfig, modifiedRecords]) => {
        return this.gridService.saveModifiedRecords(gridConfig, modifiedRecords).pipe(
          map((newRecords) => {
            const gridId = action.gridId;
            return gridActions.saveModifiedRecordsSuccess({ gridId, newRecords });
          }),
        );
      }),
    ),
  );

  openGridFormView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.openGridFormView), // TODO filter open condition
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.gridId),
          this.gridFacade.selectSetting(action.gridId),
          this.gridFacade.selectRowSelection(action.gridId),
        ];
      }),
      exhaustMap(([action, gridConfig, gridSetting, selection]) => {
        const dialogRef = this.dialogService.open(IccGridFormViewComponent, {
          closeOnBackdropClick: false,
        });
        return dialogRef.onClose;
      }),
      map((res) => {
        if (res === undefined) {
          return gridActions.closeGridFormViewg();
        }
        return gridActions.closeGridFormViewg();
      }),
    ),
  );

  clearGridDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gridActions.clearGridDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ gridId }) => of(gridId).pipe(map((gridId) => gridActions.removeGridDataStore({ gridId })))),
    ),
  );
}
