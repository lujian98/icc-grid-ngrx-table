import { Injectable, inject } from '@angular/core';
import { IccFileUpload } from '../models/file-upload.model';
import { Store } from '@ngrx/store';
import * as fileUploadActions from './file-upload.actions';
import { selectUploadFiles, selectUploadFilesGridData } from './file-upload.selectors';

@Injectable()
export class IccFileUploadFacade {
  private store = inject(Store);
  selectUploadFiles$ = this.store.select(selectUploadFiles);
  selectUploadFilesGridData$ = this.store.select(selectUploadFilesGridData);

  dropUploadFile(file: IccFileUpload): void {
    this.store.dispatch(fileUploadActions.dropUploadFile({ file }));
  }

  uploadFiles(urlKey: string): void {
    this.store.dispatch(fileUploadActions.uploadFiles({ urlKey }));
  }

  clearUploadFiles(): void {
    this.store.dispatch(fileUploadActions.clearUploadFiles());
  }
}
