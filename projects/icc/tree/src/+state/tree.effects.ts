import { Injectable, inject } from '@angular/core';
import { IccGridFacade } from '@icc/ui/grid';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { debounceTime, delay, map, mergeMap, of, switchMap } from 'rxjs';
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
        return [
          this.gridFacade.selectGridConfig(action.treeConfig.gridId),
          this.gridFacade.selectColumnsConfig(action.treeConfig.gridId),
        ];
      }),
      switchMap(([action, treeConfig, columns]) => {
        return this.treeRemoteService.getTreeRemoteData(treeConfig, columns).pipe(
          map((treeData) => {
            return treeActions.getTreeRemoteDataSuccess({ treeConfig, treeData });
          }),
        );
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
          this.gridFacade.selectGridConfig(action.treeConfig.gridId),
          this.gridFacade.selectColumnsConfig(action.treeConfig.gridId),
          this.treeFacade.selectTreeInMemoryData(action.treeConfig),
        ];
      }),
      switchMap(([action, treeConfig, columns, inMemoryData]) => {
        return this.treeinMemoryService.getTreeData(treeConfig, columns, inMemoryData).pipe(
          map((treeData) => {
            return treeActions.getInMemoryTreeDataSuccess({ treeConfig, treeData });
          }),
        );
      }),
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
