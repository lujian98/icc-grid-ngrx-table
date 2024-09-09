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

  getSelectFieldOptions(fieldConfig: IccSelectFieldConfig): Observable<any[]> {
    const url = `/api/${fieldConfig.urlKey}/${fieldConfig.fieldName}`;
    return this.http.get<any[]>(url).pipe(
      map((res) => {
        console.log(' SelectFieldOptions res=', res);
        return res;
      }),
    );
  }
}
