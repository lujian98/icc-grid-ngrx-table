import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { map, switchMap, exhaustMap, concatMap } from 'rxjs/operators';

import { IccSelectFieldService } from '../services/select-field.service';
import * as selectFieldActions from './select-field.actions';
import { IccSelectFieldFacade } from './select-field.facade';

@Injectable()
export class IccSelectFieldEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private selectfieldService = inject(IccSelectFieldService);

  getRemoteFieldConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectFieldActions.getRemoteFieldConfig),
      concatMap(({ fieldConfig }) => {
        return this.selectfieldService.getRemoteFieldConfig(fieldConfig).pipe(
          map((fieldConfig) => {
            this.store.dispatch(selectFieldActions.setupFieldConfig({ fieldConfig }));
            return selectFieldActions.getSelectFieldOptions({ fieldConfig });
          }),
        );
      }),
    ),
  );

  getSelectFieldOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectFieldActions.getSelectFieldOptions),
      concatMap(({ fieldConfig }) => {
        return this.selectfieldService.getSelectFieldOptions(fieldConfig).pipe(
          map((options) => {
            const fieldId = fieldConfig.fieldId;
            return selectFieldActions.setSelectFieldOptions({ fieldId, options });
          }),
        );
      }),
    ),
  );
}
