import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IccBackendService } from '@icc/ui/core';
import { IccFormConfig, IccFormState } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class IccFormService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getFormFieldsConfig(formConfig: IccFormConfig): Observable<any[]> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formConfig');
    const url = this.backendService.apiUrl;
    const formFields = [
      {
        fieldType: 'text',
        fieldName: 'userName',
        fieldLabel: 'User Remote',
      },
      {
        fieldType: 'text',
        fieldName: 'loginName',
        fieldLabel: 'Login Name',
      },
    ];

    return of(formFields);
    /*
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        console.log(' formConfig res=', res);
        return res;
      }),
    );*/
  }

  getFormData(formConfig: IccFormConfig): Observable<{ formConfig: IccFormConfig; formData: any }> {
    const params = this.backendService.getParams(formConfig.urlKey, 'formData');
    const url = this.backendService.apiUrl;

    const formData = {
      userName: 'R user 77 2222',
      loginName: 'R test login88',
    };
    // TODO partial formConfig from api readonly, edit, etc.
    return of({
      formConfig: { ...formConfig, readonly: true },
      formData: formData,
    });
    /*
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        console.log(' formConfig res=', res);
        return res;
      }),
    );*/
  }
}
