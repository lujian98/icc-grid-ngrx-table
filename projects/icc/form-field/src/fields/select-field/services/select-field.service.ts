import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IccSelectFieldConfig } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private http = inject(HttpClient);

  getRemoteFieldConfig(fieldConfig: IccSelectFieldConfig): Observable<IccSelectFieldConfig> {
    // console.log( ' fieldConfig=', fieldConfig)
    const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}FieldConfig`;
    return this.http.get<IccSelectFieldConfig>(url).pipe(
      map((config) => {
        return {
          ...fieldConfig,
          ...config,
        };
      }),
    );
  }

  getSelectFieldOptions(fieldConfig: IccSelectFieldConfig): Observable<any[]> {
    //console.log( ' 777777 fieldConfig=', fieldConfig)
    const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}`;
    //console.log( ' 777777 url=', url)
    return this.http.get<any[]>(url).pipe(
      map((res) => {
        if (fieldConfig.singleListOption) {
          return res.map((item) => ({
            name: item,
            title: item,
          }));
        } else {
          return res;
        }
      }),
    );
  }
}
