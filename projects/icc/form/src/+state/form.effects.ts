import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { debounceTime, concatMap, delay, map, of, mergeMap, switchMap } from 'rxjs';

import { IccFormService } from '../services/form.service';
import * as formActions from './form.actions';
import { IccFormFacade } from './form.facade';

@Injectable()
export class IccFormEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private formFacade = inject(IccFormFacade);
  private formService = inject(IccFormService);

  clearFormDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.clearFormDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ formId }) => of(formId).pipe(map((formId) => formActions.removeFormDataStore({ formId })))),
    ),
  );
}
