import { Injectable, inject } from '@angular/core';
import { IccFileDropUpload } from '../models/file-drop-upload.model';
import { Store } from '@ngrx/store';
import * as fileDropActions from './file-drop.actions';
import { selectUploadFiles } from './file-drop.selectors';

@Injectable()
export class IccFileDropFacade {
  private store = inject(Store);
  selectUploadFiles$ = this.store.select(selectUploadFiles);

  dropUploadFile(file: IccFileDropUpload): void {
    this.store.dispatch(fileDropActions.dropUploadFile({ file }));
  }

  uploadFiles(urlKey: string): void {
    this.store.dispatch(fileDropActions.uploadFiles({ urlKey }));
  }

  clearUploadFiles(): void {
    this.store.dispatch(fileDropActions.clearUploadFiles());
  }
}
