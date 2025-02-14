import { Injectable, inject } from '@angular/core';
import { IccUploadFileService } from '@icc/ui/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, delay, map, mergeMap, of } from 'rxjs';
import { IccFormService } from '../services/form.service';
import * as formActions from './form.actions';

@Injectable()
export class IccFormEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private formService = inject(IccFormService);
  private uploadFileService = inject(IccUploadFileService);

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

  saveFormData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.saveFormData),
      concatMap(({ formConfig, formData }) => {
        return this.formService.saveFormData(formConfig, formData).pipe(
          map(({ formConfig, formData }) => {
            return formActions.saveFormDataSuccess({ formConfig, formData });
          }),
        );
      }),
    ),
  );

  /*
  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.uploadFiles),
      concatMap(({ formConfig, files }) => {
        return this.uploadFileService.sendFormUploadFiles(formConfig.urlKey, files).pipe(
          map(({ formConfig }) => {
            this.uploadFileService.uploadFiles = [];
            return formActions.uploadFilesSuccess({ formConfig });
          }),
        );
      }),
    ),
  );*/

  clearFormDataStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.clearFormDataStore),
      delay(250), // wait 250 after destory the component to clear data store
      mergeMap(({ formId }) => of(formId).pipe(map((formId) => formActions.removeFormDataStore({ formId })))),
    ),
  );
}
