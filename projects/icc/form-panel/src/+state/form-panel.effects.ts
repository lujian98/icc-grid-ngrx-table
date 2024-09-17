import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { debounceTime, concatMap, delay, map, of, mergeMap, switchMap } from 'rxjs';

import { IccFormPanelService } from '../services/form-panel.service';
import * as formPanelActions from './form-panel.actions';
import { IccFormPanelFacade } from './form-panel.facade';

@Injectable()
export class IccFormPanelEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private formPanelFacade = inject(IccFormPanelFacade);
  private formPanelService = inject(IccFormPanelService);

  clearFormPanelDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formPanelActions.clearFormPanelDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ formPanelId }) =>
        of(formPanelId).pipe(map((formPanelId) => formPanelActions.removeFormPanelDataStore({ formPanelId }))),
      ),
    ),
  );
}
