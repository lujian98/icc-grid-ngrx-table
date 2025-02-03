import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, catchError, map, throwError } from 'rxjs';
import { IccBackendService } from '@icc/ui/core';
import {
  IccColumnConfig,
  IccColumnFilter,
  IccGridConfig,
  IccGridData,
  IccSortField,
} from '../models/grid-column.model';
import { IccFilterFactory } from './filter/filter_factory';
import { IccRansackFilterFactory } from './ransack/filter/filter_factory';

@Injectable({
  providedIn: 'root',
})
export class IccGridService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getGridConfig(gridConfig: IccGridConfig): Observable<IccGridConfig> {
    const params = this.backendService.getParams(gridConfig.urlKey, 'gridConfig');
    const url = this.backendService.apiUrl;
    return this.http.get<IccGridConfig>(url, { params }).pipe(
      map((config) => {
        return {
          ...gridConfig,
          ...config,
        };
      }),
    );
  }

  getGridColumnsConfig(gridConfig: IccGridConfig): Observable<IccColumnConfig[]> {
    const params = this.backendService.getParams(gridConfig.urlKey, 'columnConfig');
    const url = this.backendService.apiUrl;
    return this.http.get<IccColumnConfig[]>(url, { params }).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  getGridInMemoeryData<T>(gridConfig: IccGridConfig, columns: IccColumnConfig[]): Observable<IccGridData<T>> {
    return of();
  }

  getGridData<T>(gridConfig: IccGridConfig, columns: IccColumnConfig[]): Observable<IccGridData<object>> {
    let params = this.backendService.getParams(gridConfig.urlKey, 'gridData');
    params = this.appendFilterHttpParams(gridConfig.columnFilters, columns, params);
    params = this.appendSortHttpParams(gridConfig.sortFields, params);
    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    const url = this.backendService.apiUrl;
    return this.http.get<IccGridData<object>>(url, { params }).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) =>
        throwError(() => {
          return error;
        }),
      ),
    );
  }

  appendFilterHttpParams(columnFilters: IccColumnFilter[], columns: IccColumnConfig[], params: HttpParams): HttpParams {
    const ransackFilterFactory = new IccRansackFilterFactory();
    const filterFactory = new IccFilterFactory();
    columnFilters.forEach((col) => {
      const column = columns.find((item) => item.name === col.name);
      const filter = filterFactory.getFilter(column!);
      filter.search = col.value;
      const ransackFilter = ransackFilterFactory.getFilter(filter);
      const filterParams = ransackFilter.getParams();
      if (filterParams && filterParams.length > 0) {
        filterParams.forEach((pairs: { [index: string]: string | number }) => {
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
