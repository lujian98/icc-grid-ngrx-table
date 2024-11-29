import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { debounceTime, concatMap, delay, map, of, mergeMap, switchMap } from 'rxjs';
import { IccTreeinMemoryService } from '../services/tree-in-memory.service';
//import { IccTreeService } from '../services/tree.service';
import * as treeActions from './tree.actions';
import { IccTreeFacade } from './tree.facade';
import { IccColumnConfig, IccGridStateModule, IccGridFacade } from '@icc/ui/grid';

@Injectable()
export class IccTreeEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private gridFacade = inject(IccGridFacade);
  private treeFacade = inject(IccTreeFacade);
  //private treeService = inject(IccTreeService);
  private treeinMemoryService = inject(IccTreeinMemoryService);

  getTreeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(treeActions.getTreeData),
      debounceTime(10), // debounce with switchMap may lose data if two or more tree pull, but will cancel previous call
      concatLatestFrom((action) => {
        return [
          this.gridFacade.selectGridConfig(action.treeConfig.gridId),
          this.gridFacade.selectColumnsConfig(action.treeConfig.gridId),
          this.treeFacade.selectTreeInMemoryData(action.treeConfig),
        ];
      }),
      switchMap(([action, treeConfig, columns, inMemoryData]) => {
        const treeId = action.treeConfig.gridId;
        /*
        if (treeConfig.remoteTreeData) {
          return this.treeService.getTreeData(treeConfig, columns).pipe(
            map((treeData) => {
              //console.log( ' remoteTreeData loaded ')
              return treeActions.getTreeDataSuccess({ treeId, treeData });
            }),
          );
        } else {
         */
        return this.treeinMemoryService.getTreeData(treeConfig, columns, inMemoryData).pipe(
          map((treeData) => {
            return treeActions.getTreeDataSuccess({ treeConfig, treeData });
          }),
        );
        //}
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
