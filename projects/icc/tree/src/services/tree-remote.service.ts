import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IccBackendService } from '@icc/ui/core';
import { IccColumnConfig } from '@icc/ui/grid';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { IccTreeConfig, IccTreeData } from '../models/tree-grid.model';

@Injectable({
  providedIn: 'root',
})
export class IccTreeRemoteService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getTreeRemoteData<T>(treeConfig: IccTreeConfig, columns: IccColumnConfig[]): Observable<IccTreeData[]> {
    //console.log(' service getGridData treeConfig =', treeConfig);
    let params = this.backendService.getParams(treeConfig.urlKey, 'treeData');

    //params = this.appendFilterHttpParams(treeConfig.columnFilters, columns, params);
    //params = this.appendSortHttpParams(treeConfig.sortFields, params);
    const offset = (treeConfig.page - 1) * treeConfig.pageSize;
    const limit = treeConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    //console.log(' params =', params);
    const url = this.backendService.apiUrl;
    return this.http.get<IccTreeData[]>(url, { params }).pipe(
      map((res) => {
        console.log('1444444 res=', res);
        return res;
      }),
      catchError((error) =>
        throwError(() => {
          //console.log(' error=', error);
          return error;
        }),
      ),
    );
  }

  /*
  appendFilterHttpParams(columnFilters: IccColumnFilter[], columns: IccColumnConfig[], params: HttpParams): HttpParams {
    //console.log(' 888888888 treeConfig.columnFilters=', columnFilters, ' columns=', columns);
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
    */
}
