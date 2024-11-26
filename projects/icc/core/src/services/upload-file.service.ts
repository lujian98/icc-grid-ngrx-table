import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IccBackendService } from '../backend/services/backend.service';

export interface IccUploadFile {
  fieldName: string;
  relativePath?: string;
  file: File;
}

@Injectable({
  providedIn: 'root',
})
export class IccUploadFileService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  private _uploadFiles: IccUploadFile[] = [];
  // private uploadFiles = new BehaviorSubject<IccUploadFile[] | null>(null);
  // uploadFiles$ = this.uploadFiles.asObservable();

  set uploadFiles(files: IccUploadFile[]) {
    this._uploadFiles = files;
  }
  get uploadFiles(): IccUploadFile[] {
    return this._uploadFiles;
  }

  formUploadFileChanged(fieldName: string, file: File | null): void {
    console.log('ssss files =', file);
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

  sendFormUploadFiles(urlKey: string, files: IccUploadFile[]): Observable<any> {
    const url = this.backendService.apiUrl;
    const formData = this.backendService.getFormData(urlKey, 'uploadFiles');
    files.forEach((file) => {
      formData.append('filelist[]', file.fieldName);
      formData.append(file.fieldName, file.file, file.relativePath);
    });
    console.log(' send upload file=', urlKey, ' file=', files);
    //TODO response ???
    return this.http.post(url, formData).pipe(
      map((res) => {
        return {
          res,
        };
      }),
    );
  }
}
