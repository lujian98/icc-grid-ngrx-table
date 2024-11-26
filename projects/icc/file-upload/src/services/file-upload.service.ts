import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IccBackendService, IccUploadFile } from '@icc/ui/core';

@Injectable({
  providedIn: 'root',
})
export class IccFileUploadService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  sendUploadFiles(urlKey: string, files: IccUploadFile[]): Observable<any> {
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
