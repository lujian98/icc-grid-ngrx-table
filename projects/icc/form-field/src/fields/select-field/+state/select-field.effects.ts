import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, switchMap, exhaustMap, concatMap } from 'rxjs/operators';

import { IccSelectFieldService } from '../services/select-field.service';
import * as selectFieldActions from './select-field.actions';
import { IccSelectFieldFacade } from './select-field.facade';

@Injectable()
export class IccSelectFieldEffects {
  private actions$ = inject(Actions);
  private selectfieldService = inject(IccSelectFieldService);

  setupSelectFieldConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectFieldActions.getSelectFieldOptions),
      concatMap(({ fieldId, fieldConfig }) => {
        return this.selectfieldService.getSelectFieldOptions(fieldConfig).pipe(
          map((options) => {
            return selectFieldActions.setSelectFieldOptions({ fieldId, options });
          }),
        );
      }),
    ),
  );
}
