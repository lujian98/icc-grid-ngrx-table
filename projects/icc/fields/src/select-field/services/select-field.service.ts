import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IccBackendService } from '@icc/ui/core';
import { IccSelectFieldConfig, IccOptionType } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private readonly http = inject(HttpClient);
  private readonly backendService = inject(IccBackendService);

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

  getSelectFieldOptions(fieldConfig: IccSelectFieldConfig): Observable<IccOptionType[]> {
    const params = this.backendService.getParams(fieldConfig.urlKey, 'select', fieldConfig.fieldName);
    const url = this.backendService.apiUrl;
    return this.http.get<IccOptionType[]>(url, { params }).pipe(
      map((options) => {
        return options;
      }),
    );
  }
}
