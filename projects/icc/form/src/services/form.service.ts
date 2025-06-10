import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IccBackendService, IccUploadFile } from '@icc/ui/core';
import { IccFormConfig } from '../models/form.model';
import { IccFormField } from '@icc/ui/fields';

@Injectable({
  providedIn: 'root',
})
export class IccFormService {
  private readonly http = inject(HttpClient);
  private readonly backendService = inject(IccBackendService);

  getRemoteFormConfig(formConfig: IccFormConfig): Observable<IccFormConfig> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formConfig');
    const url = this.backendService.apiUrl;
    return this.http.get<IccFormConfig>(url, { params }).pipe(
      map((res) => {
        return {
          ...formConfig,
          ...res,
        };
      }),
    );
  }

  getFormFieldsConfig(formConfig: IccFormConfig): Observable<IccFormField[]> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formFields');
    const url = this.backendService.apiUrl;
    return this.http.get<IccFormField[]>(url, { params }).pipe(
      map((res) => {
        return [...res];
      }),
    );
  }

  getFormData(formConfig: IccFormConfig): Observable<{ formConfig: IccFormConfig; formData: object }> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formData');
    const url = this.backendService.apiUrl;
    return this.http.get<{ formConfig: IccFormConfig; formData: object }>(url, { params }).pipe(
      map((res) => {
        return {
          formConfig: { ...formConfig, ...res.formConfig },
          formData: { ...res.formData },
        };
      }),
    );
  }

  saveFormData(
    formConfig: IccFormConfig,
    formData: object,
  ): Observable<{ formConfig: IccFormConfig; formData: object }> {
    const params = this.backendService.getParams(formConfig.urlKey, 'saveFormData');
    const url = this.backendService.apiUrl;
    return this.http.put<{ formConfig: IccFormConfig; formData: object }>(url, { params }).pipe(
      map((res) => {
        return {
          formConfig: { ...formConfig, ...res.formConfig },
          formData: { ...res.formData },
        };
      }),
    );
  }

  /*
  uploadFiles(formConfig: IccFormConfig, files: IccUploadFile[]): Observable<{ formConfig: IccFormConfig }> {
    const url = this.backendService.apiUrl;
    const formData = this.backendService.getFormData(formConfig.urlKey, 'uploadFiles');
    files.forEach((file) => {
      formData.append('filelist[]', file.fieldName);
      formData.append(file.fieldName, file.file);
    });
    //console.log(' url =', url);
    return this.http.post<{ formConfig: IccFormConfig }>(url, formData).pipe(
      map((res) => {
        //console.log(' formData res=', res);
        return {
          formConfig: { ...formConfig },
        };
      }),
    );
  }*/
}
