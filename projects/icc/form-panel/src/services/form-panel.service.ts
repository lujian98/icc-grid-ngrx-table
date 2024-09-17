import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IccBackendService } from '@icc/ui/core';
//import { IccSelectFieldConfig } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccFormPanelService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  /*
  getRemoteFieldConfig(fieldConfig: IccSelectFieldConfig): Observable<IccSelectFieldConfig> {
    const params = this.backendService.getParams(fieldConfig.urlKey, 'selectFieldConfig', fieldConfig.fieldName);
    const url = this.backendService.apiUrl;
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
    const params = this.backendService.getParams(fieldConfig.urlKey, 'select', fieldConfig.fieldName);
    const url = this.backendService.apiUrl;
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
    */
}
