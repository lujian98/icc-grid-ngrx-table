import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IccBackendService, IccUploadFile } from '@icc/ui/core';
import { IccFileUploadConfig } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class IccFileUploadService {
  private readonly http = inject(HttpClient);
  private readonly backendService = inject(IccBackendService);

  sendUploadFiles(fileUploadConfig: IccFileUploadConfig, files: IccUploadFile[]): Observable<object> {
    const url = this.backendService.apiUrl;
    const formData = this.backendService.getFormData(fileUploadConfig.urlKey, 'uploadFiles');
    files.forEach((file) => {
      formData.append('filelist[]', file.fieldName);
      if (file.relativePath) {
        formData.append(file.fieldName, file.file, file.relativePath);
      } else {
        formData.append(file.fieldName, file.file);
      }
    });
    return this.http.post(url, formData).pipe(
      map((res) => {
        return {
          res,
        };
      }),
    );
  }
}
