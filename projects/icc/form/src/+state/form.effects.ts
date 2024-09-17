import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, delay, map, mergeMap, of, switchMap } from 'rxjs';
import { IccFormService } from '../services/form.service';
import * as formActions from './form.actions';
import { IccFormFacade } from './form.facade';

@Injectable()
export class IccFormEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private formFacade = inject(IccFormFacade);
  private formService = inject(IccFormService);

  loadFormFieldsConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.loadFormFieldsConfig),
      concatMap((action) => {
        const formConfig = action.formConfig;
        return this.formService.getFormFieldsConfig(formConfig).pipe(
          map((formFields) => {
            if (formConfig.remoteValues) {
              this.store.dispatch(formActions.loadFormFieldsConfigSuccess({ formConfig, formFields }));
              const formId = formConfig.formId;
              return formActions.getFormData({ formId });
            } else {
              return formActions.loadFormFieldsConfigSuccess({ formConfig, formFields });
            }
          }),
        );
      }),
    ),
  );

  getFormData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.getFormData),
      debounceTime(10),
      concatLatestFrom((action) => {
        return [this.formFacade.selectFormConfig(action.formId)];
      }),
      switchMap(([_, formConfig]) => {
        return this.formService.getFormData(formConfig).pipe(
          map(({ formConfig, formData }) => {
            //console.log(' remoteGridData loaded =', formData);
            return formActions.getFormDataSuccess({ formConfig, formData });
          }),
        );
      }),
    ),
  );

  clearFormDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.clearFormDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ formId }) => of(formId).pipe(map((formId) => formActions.removeFormDataStore({ formId })))),
    ),
  );
}
