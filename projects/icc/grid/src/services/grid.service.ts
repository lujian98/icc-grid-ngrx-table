import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridData,
  IccSortField,
  IccColumnFilter,
} from '../models/grid-column.model';
import { IccRansackFilterFactory } from './ransack/filter/filter_factory';
import { IccFilterFactory } from './filter/filter_factory';
import { CARSDATA3 } from '../spec-helpers/cars-large';

@Injectable({
  providedIn: 'root',
})
export class IccGridService {
  private http = inject(HttpClient);

  getGridConfig(gridId: string, gridConfig: IccGridConfig): Observable<IccGridConfig> {
    //console.log(' service config =', gridConfig)//
    //TODO need a flag to tell if gridConfig or default saved in the remote database, read from here, otherwise return client side gridConfig
    return of(gridConfig);
  }

  getGridColumnsConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig[]): Observable<IccColumnConfig[]> {
    // TODO load gridconfig and columnConfig at the same time???
    const url = `/api/${gridConfig.urlKey}/columnConfig`;
    return this.http.get<any[]>(url).pipe(
      map((res) => {
        console.log(' DCRColumnConfig res=', res);
        return res;
      }),
    );
  }

  getGridInMemoeryData<T>(gridConfig: IccGridConfig, columns: IccColumnConfig[]): Observable<IccGridData<T>> {
    // TODO where to store local data and process these data?
    return of(CARSDATA3);
  }

  getGridData<T>(gridConfig: IccGridConfig, columns: IccColumnConfig[]): Observable<IccGridData<T>> {
    console.log(' service getGridData gridConfig =', gridConfig);
    let params = new HttpParams();

    params = this.appendFilterHttpParams(gridConfig.columnFilters, columns, params);
    params = this.appendSortHttpParams(gridConfig.sortFields, params);

    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    //console.log(' params =', params);
    const urlKey = gridConfig.urlKey;
    return this.http.get<IccGridData<T>>(`/api/${urlKey}`, { params }).pipe(
      map((res) => {
        console.log(' res=', res);
        return res;
      }),
    );
  }

  appendFilterHttpParams(columnFilters: IccColumnFilter[], columns: IccColumnConfig[], params: HttpParams): HttpParams {
    //console.log(' 888888888 gridConfig.columnFilters=', columnFilters, ' columns=', columns);
    const ransackFilterFactory = new IccRansackFilterFactory();
    const filterFactory = new IccFilterFactory();
    columnFilters.forEach((col) => {
      const column = columns.find((item) => item.name === col.name);
      const filter = filterFactory.getFilter(column!);
      filter.search = col.value;
      const ransackFilter = ransackFilterFactory.getFilter(filter);
      const filterParams = ransackFilter.getParams();
      if (filterParams && filterParams.length > 0) {
        filterParams.forEach((pairs: any) => {
          Object.keys(pairs).forEach((key) => {
            let value = pairs[key];
            value = value || value === 0 ? value.toString() : '';
            params = params.append(key, value);
          });
        });
      }
    });
    return params;
  }

  appendSortHttpParams(sorts: IccSortField[], params: HttpParams): HttpParams {
    sorts.forEach((sort) => {
      const val = sort.field + '.' + sort.dir;
      params = params.append('order', val.toString());
      if (sort.dir === 'asc') {
        params = params.append('sort', sort.field);
      } else {
        params = params.append('sort', '-' + sort.field);
      }
    });
    return params;
  }
}
