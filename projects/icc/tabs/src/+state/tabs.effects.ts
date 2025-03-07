import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, delay, map, mergeMap, of } from 'rxjs';
import { IccTabsService } from '../services/tabs.service';
import * as tabsActions from './tabs.actions';

@Injectable()
export class IccTabsEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private tabsService = inject(IccTabsService);

  getRemoteTabsConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.loadRemoteTabsConfig),
      concatMap(({ tabsId, tabsConfig }) => {
        return this.tabsService.getRemoteTabsConfig(tabsConfig).pipe(
          map((tabsConfig) => {
            this.store.dispatch(tabsActions.loadTabsConfigSuccess({ tabsId, tabsConfig }));
            return tabsActions.loadTabsOptions({ tabsId, tabsConfig });
          }),
        );
      }),
    ),
  );

  loadTabsOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.loadTabsOptions),
      concatMap(({ tabsId, tabsConfig }) => {
        return this.tabsService.getTabsOptions(tabsConfig).pipe(
          map((options) => {
            return tabsActions.loadTabsOptionsSuccess({ tabsId, options });
          }),
        );
      }),
    ),
  );

  clearTabsStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.clearTabsStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ tabsId }) => of(tabsId).pipe(map((tabsId) => tabsActions.removeTabsStore({ tabsId })))),
    ),
  );
}
