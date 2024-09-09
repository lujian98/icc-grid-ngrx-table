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

/*
  getGridData<T>(gridConfig: IccGridConfig, columns: IccColumnConfig[]): Observable<IccGridData<T>> {
    let params = new HttpParams();

    params = this.appendFilterHttpParams(gridConfig.columnFilters, columns, params);
    params = this.appendSortHttpParams(gridConfig.sortFields, params);

    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    //console.log(' service getGridData gridConfig =', gridConfig);
    //console.log(' params =', params);
    const urlKey = gridConfig.urlKey;
    return this.http.get<IccGridData<T>>(`/api/${urlKey}`, { params }).pipe(
      map((res) => {
        console.log(' res=', res);
        return res;
      }),
    );
  }

  */
