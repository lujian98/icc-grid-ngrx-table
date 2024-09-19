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
  private formService = inject(IccFormService);

  loadRemoteFormConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.loadRemoteFormConfig),
      concatMap(({ formConfig }) => {
        return this.formService.getRemoteFormConfig(formConfig).pipe(
          map((formConfig) => {
            if (formConfig.remoteFieldsConfig) {
              this.store.dispatch(formActions.loadRemoteFormConfigSuccess({ formConfig }));
              return formActions.loadFormFieldsConfig({ formConfig });
            } else {
              return formActions.loadRemoteFormConfigSuccess({ formConfig });
            }
          }),
        );
      }),
    ),
  );

  loadFormFieldsConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.loadFormFieldsConfig),
      concatMap((action) => {
        const formConfig = action.formConfig;
        return this.formService.getFormFieldsConfig(formConfig).pipe(
          map((formFields) => {
            if (formConfig.remoteFormData) {
              this.store.dispatch(formActions.loadFormFieldsConfigSuccess({ formConfig, formFields }));
              return formActions.getFormData({ formConfig });
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
      concatMap(({ formConfig }) => {
        return this.formService.getFormData(formConfig).pipe(
          map(({ formConfig, formData }) => {
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
