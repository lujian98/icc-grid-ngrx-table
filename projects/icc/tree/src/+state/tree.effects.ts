import { Injectable, inject } from '@angular/core';
import { IccGridFacade, loadGridColumnsConfigSuccess, setGridColumnFilters, setGridSortFields } from '@icc/ui/grid';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, debounceTime, delay, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { IccTreeConfig } from '../models/tree-grid.model';
import { IccTreeinMemoryService } from '../services/tree-in-memory.service';
import { IccTreeRemoteService } from '../services/tree-remote.service';
import * as treeActions from './tree.actions';
import { IccTreeFacade } from './tree.facade';

@Injectable()
export class IccTreeEffects {
  private actions$ = inject(Actions);
  private gridFacade = inject(IccGridFacade);
  private treeFacade = inject(IccTreeFacade);
  private treeRemoteService = inject(IccTreeRemoteService);
  private treeinMemoryService = inject(IccTreeinMemoryService);

  getTreeRemoteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(treeActions.getTreeRemoteData),
      debounceTime(10), // debounce with switchMap may lose data if two or more tree pull, but will cancel previous call
      concatLatestFrom((action) => {
        return [this.gridFacade.selectGridConfig(action.treeId), this.gridFacade.selectColumnsConfig(action.treeId)];
      }),
      switchMap(([action, treeConfig, columns]) => {
        const treeId = action.treeId;
        return this.treeRemoteService.getTreeRemoteData(treeConfig, columns).pipe(
          map((treeData) => {
            this.gridFacade.setLoadTreeDataLoading(treeId, false);
            return treeActions.getTreeRemoteDataSuccess({ treeId, treeConfig, treeData });
          }),
        );
      }),
    ),
  );

  getConcatTreeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(treeActions.getConcatTreeData),
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.treeId),
          this.gridFacade.selectColumnsConfig(action.treeId),
          this.treeFacade.selectTreeInMemoryData(action.treeId),
        ];
      }),
      concatMap(([action, treeConfig, columns, inMemoryData]) => {
        const treeId = action.treeId;
        if (treeConfig.remoteGridData) {
          return this.treeRemoteService.getTreeRemoteData(treeConfig, columns).pipe(
            map((treeData) => {
              this.gridFacade.setLoadTreeDataLoading(treeId, false);
              return treeActions.getTreeRemoteDataSuccess({ treeId, treeConfig, treeData });
            }),
          );
        } else {
          return this.treeinMemoryService.getTreeData(treeConfig, columns, inMemoryData).pipe(
            map((treeData) => {
              this.gridFacade.setLoadTreeDataLoading(treeId, false);
              return treeActions.getInMemoryTreeDataSuccess({ treeId, treeConfig, treeData });
            }),
          );
        }
      }),
    ),
  );

  // for remoteLoadAll not refresh and in memory data
  getTreeInMemoryData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(treeActions.getTreeInMemoryData),
      debounceTime(10), // debounce with switchMap may lose data if two or more tree pull, but will cancel previous call
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.treeId),
          this.gridFacade.selectColumnsConfig(action.treeId),
          this.treeFacade.selectTreeInMemoryData(action.treeId),
        ];
      }),
      switchMap(([action, treeConfig, columns, inMemoryData]) => {
        const treeId = action.treeId;
        return this.treeinMemoryService.getTreeData(treeConfig, columns, inMemoryData).pipe(
          map((treeData) => {
            this.gridFacade.setLoadTreeDataLoading(treeId, false);
            return treeActions.getInMemoryTreeDataSuccess({ treeId, treeConfig, treeData });
          }),
        );
      }),
    ),
  );

  setGridColumnFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setGridColumnFilters, loadGridColumnsConfigSuccess), // gridActions
      switchMap(({ gridId, gridConfig, isTreeGrid }) =>
        of({ gridId, gridConfig, isTreeGrid }).pipe(
          filter(({ isTreeGrid }) => isTreeGrid),
          map(({ gridId, gridConfig }) => {
            const treeId = gridId;
            const treeConfig = gridConfig as IccTreeConfig;
            if (gridConfig.remoteGridData && !treeConfig.remoteLoadAll) {
              return treeActions.getTreeRemoteData({ treeId, treeConfig });
            } else {
              return treeActions.getTreeInMemoryData({ treeId, treeConfig });
            }
          }),
        ),
      ),
    ),
  );

  setGridSortFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setGridSortFields), // gridActions
      switchMap(({ gridId, gridConfig, isTreeGrid }) =>
        of({ gridId, gridConfig, isTreeGrid }).pipe(
          filter(({ isTreeGrid }) => isTreeGrid),
          map(({ gridId, gridConfig }) => {
            const treeId = gridId;
            const treeConfig = gridConfig as IccTreeConfig;
            if (treeConfig.remoteGridData && !treeConfig.remoteLoadAll) {
              return treeActions.getTreeRemoteData({ treeId, treeConfig });
            } else {
              return treeActions.getTreeInMemoryData({ treeId, treeConfig });
            }
          }),
        ),
      ),
    ),
  );

  clearTreeDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(treeActions.clearTreeDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ treeId }) => of(treeId).pipe(map((treeId) => treeActions.removeTreeDataStore({ treeId })))),
    ),
  );
}
