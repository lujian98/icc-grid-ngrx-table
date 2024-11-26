import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fileUploadActions from './file-upload.actions';
import { selectUploadFiles, selectUploadFilesGridData } from './file-upload.selectors';

@Injectable()
export class IccFileUploadFacade {
  private store = inject(Store);
  selectUploadFiles$ = this.store.select(selectUploadFiles);
  selectUploadFilesGridData$ = this.store.select(selectUploadFilesGridData);

  dropUploadFile(relativePath: string, file: File): void {
    this.store.dispatch(fileUploadActions.dropUploadFile({ relativePath, file }));
  }

  selectUploadFile(fieldName: string, file: File | null): void {
    if (file) {
      this.store.dispatch(fileUploadActions.selectUploadFile({ fieldName, file }));
    } else {
      this.store.dispatch(fileUploadActions.clearSelectUploadFile({ fieldName }));
    }
  }

  uploadFiles(urlKey: string): void {
    this.store.dispatch(fileUploadActions.uploadFiles({ urlKey }));
  }

  clearUploadFiles(): void {
    this.store.dispatch(fileUploadActions.clearUploadFiles());
  }
}
