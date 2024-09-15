import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IccBackendService } from '@icc/ui/core';
import { IccSelectFieldConfig } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getRemoteFieldConfig(fieldConfig: IccSelectFieldConfig): Observable<IccSelectFieldConfig> {
    //const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}FieldConfig`;
    let params = new HttpParams();
    params = params.append('keyName', fieldConfig.urlKey);
    params = params.append('action', 'selectFieldConfig');
    params = params.append('path', fieldConfig.fieldName);
    //const url = this.backendService.getUrl(`${fieldConfig.urlKey}/${fieldConfig.fieldName}FieldConfig`);
    const url = this.backendService.getUrl(`index.php`);
    return this.http.get<IccSelectFieldConfig>(url, { params }).pipe(
      map((config) => {
        return {
          ...fieldConfig,
          ...config,
          remoteOptions: true, // remote config requires remote options
        };
      }),
    );
  }

  getSelectFieldOptions(fieldConfig: IccSelectFieldConfig): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('keyName', fieldConfig.urlKey);
    params = params.append('action', 'select');
    params = params.append('path', fieldConfig.fieldName);
    //const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}`;
    //const url = this.backendService.getUrl(`${fieldConfig.urlKey}/${fieldConfig.fieldName}`);
    const url = this.backendService.getUrl(`index.php`);
    return this.http.get<any[]>(url, { params }).pipe(
      map((options) => {
        if (fieldConfig.singleListOption) {
          return options.map((item) => ({
            name: item,
            title: item,
          }));
        } else {
          return options;
        }
      }),
    );
  }
}
