import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IccUploadFile {
  fieldName: string;
  file: File;
}

@Injectable({
  providedIn: 'root',
})
export class IccUploadFileService {
  private _uploadFiles: IccUploadFile[] = [];
  // private uploadFiles = new BehaviorSubject<IccUploadFile[] | null>(null);
  // uploadFiles$ = this.uploadFiles.asObservable();

  set uploadFiles(files: IccUploadFile[]) {
    this._uploadFiles = files;
  }
  get uploadFiles(): IccUploadFile[] {
    return this._uploadFiles;
  }

  uploadFileChanged(fieldName: string, file: File | null): void {
    this.uploadFiles = this.uploadFiles.filter((file) => file.fieldName !== fieldName);
    if (file) {
      this.uploadFiles = [
        ...this.uploadFiles,
        {
          fieldName: fieldName,
          file: file,
        },
      ];
    }
  }
}
