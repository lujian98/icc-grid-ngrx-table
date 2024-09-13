import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { IccBackendService } from '@icc/ui/core';
import { IccSelectFieldConfig } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private http = inject(HttpClient);
  // private backendService = inject(IccBackendService);

  getRemoteFieldConfig(fieldConfig: IccSelectFieldConfig): Observable<IccSelectFieldConfig> {
    const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}FieldConfig`;
    // const url = this.backendService.getUrl(`${fieldConfig.urlKey}/${fieldConfig.fieldName}FieldConfig`);
    return this.http.get<IccSelectFieldConfig>(url).pipe(
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
    const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}`;
    //const url = this.backendService.getUrl(`${fieldConfig.urlKey}/${fieldConfig.fieldName}`);
    return this.http.get<any[]>(url).pipe(
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
