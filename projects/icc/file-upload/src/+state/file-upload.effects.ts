import { Injectable, inject } from '@angular/core';
import { IccUploadFileService } from '@icc/ui/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, map } from 'rxjs';
import * as fileUploadActions from './file-upload.actions';
import { IccFileUploadFacade } from './file-upload.facade';

@Injectable()
export class IccFileUploadEffects {
  private actions$ = inject(Actions);
  private uploadFileService = inject(IccUploadFileService);
  private fileUploadFacade = inject(IccFileUploadFacade);

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadActions.uploadFiles),
      concatLatestFrom(() => {
        return [this.fileUploadFacade.selectUploadFiles$];
      }),
      concatMap(([action, uploadFiles]) => {
        return this.uploadFileService.sendUploadFiles(action.urlKey, uploadFiles).pipe(
          map(() => {
            return fileUploadActions.uploadFilesSuccess();
          }),
        );
      }),
    ),
  );
}
