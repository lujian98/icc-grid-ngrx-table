import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IccBackendService } from '@icc/ui/core';
import { IccFormConfig } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class IccFormService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getRemoteFormConfig(formConfig: IccFormConfig): Observable<IccFormConfig> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formConfig');
    const url = this.backendService.apiUrl;
    return this.http.get<any>(url, { params }).pipe(
      map((res) => {
        //console.log(' formConfig res=', res);
        return {
          ...formConfig,
          ...res,
        };
      }),
    );
  }

  getFormFieldsConfig(formConfig: IccFormConfig): Observable<any[]> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formFields');
    const url = this.backendService.apiUrl;
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        //console.log(' formFields res=', res);
        return [...res];
      }),
    );
  }

  getFormData(formConfig: IccFormConfig): Observable<{ formConfig: IccFormConfig; formData: any }> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formData');
    const url = this.backendService.apiUrl;
    return this.http.get<{ formConfig: IccFormConfig; formData: any }>(url, { params }).pipe(
      map((res) => {
        //console.log(' formData res=', res);
        return {
          formConfig: { ...formConfig, ...res.formConfig },
          formData: { ...res.formData },
        };
      }),
    );
  }

  saveFormData(formConfig: IccFormConfig, formData: any): Observable<{ formConfig: IccFormConfig; formData: any }> {
    const params = this.backendService.getParams(formConfig.urlKey, 'saveFormData');
    const url = this.backendService.apiUrl;
    return this.http.put<{ formConfig: IccFormConfig; formData: any }>(url, { params }).pipe(
      map((res) => {
        //console.log(' formData res=', res);
        return {
          formConfig: { ...formConfig, ...res.formConfig },
          formData: { ...res.formData },
        };
      }),
    );
  }
}
