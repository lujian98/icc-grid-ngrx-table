import { Injectable, inject } from '@angular/core';
import { IccFileUploadService } from '../services/file-upload.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, map } from 'rxjs';
import * as fileUploadActions from './file-upload.actions';
import { IccFileUploadFacade } from './file-upload.facade';

@Injectable()
export class IccFileUploadEffects {
  private actions$ = inject(Actions);
  private fileUploadService = inject(IccFileUploadService);
  private fileUploadFacade = inject(IccFileUploadFacade);

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadActions.uploadFiles),
      concatLatestFrom(() => {
        return [this.fileUploadFacade.selectUploadFiles$];
      }),
      concatMap(([action, uploadFiles]) => {
        return this.fileUploadService.sendUploadFiles(action.fileUploadConfig, uploadFiles).pipe(
          map(() => {
            console.log(' send file suceesss');
            return fileUploadActions.uploadFilesSuccess();
          }),
        );
      }),
    ),
  );
}
