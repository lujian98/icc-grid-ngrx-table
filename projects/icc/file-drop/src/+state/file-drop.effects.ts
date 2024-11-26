import { Injectable, inject } from '@angular/core';
import { IccUploadFileService } from '@icc/ui/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, map } from 'rxjs';
import * as fileDropActions from './file-drop.actions';
import { IccFileDropFacade } from './file-drop.facade';

@Injectable()
export class IccFileDropEffects {
  private actions$ = inject(Actions);
  private uploadFileService = inject(IccUploadFileService);
  private fileDropFacade = inject(IccFileDropFacade);

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileDropActions.uploadFiles),
      concatLatestFrom(() => {
        return [this.fileDropFacade.selectUploadFiles$];
      }),
      concatMap(([action, uploadFiles]) => {
        return this.uploadFileService.sendUploadFiles(action.urlKey, uploadFiles).pipe(
          map(() => {
            return fileDropActions.uploadFilesSuccess();
          }),
        );
      }),
    ),
  );
}
