import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IccColumnConfig, IccGridConfig, IccGridData, IccSortField } from '../models/grid-column.model';
//import { CARSDATA } from '../spec-helpers/cars-large';

@Injectable({
  providedIn: 'root',
})
export class IccGridService {
  private http = inject(HttpClient);

  getGridConfig(gridName: string, gridConfig: IccGridConfig): Observable<IccGridConfig> {
    //console.log(' service config =', gridConfig)
    return of(gridConfig);
    /*
    return this.http
      .get<EmailResponse>(this.endpointService.buildUrl('smtp_settings'))
      .pipe(map(this.adapter.adapt));
      */
  }

  getGridColumnConfig(gridName: string, columnConfig: IccColumnConfig[]): Observable<IccColumnConfig[]> {
    //console.log(' service columnConfig =', columnConfig)
    const config: IccColumnConfig[] = [{
      name: 'ID',
    }, {
      name: 'vin',
    }, {
      name: 'brand',
    }, {
      name: 'year',
    }, {
      name: 'color',
    }];

    return of(config);
    /*
    return this.http
      .get<EmailResponse>(this.endpointService.buildUrl('smtp_settings'))
      .pipe(map(this.adapter.adapt));
      */
  }

  getGridData<T>(gridName: string, gridConfig: IccGridConfig): Observable<IccGridData<T>> {
    //console.log(' service get =', gridData)
    //const data: IccGridData<any> = CARSDATA;
    // return of(data);
    let params = new HttpParams();
    params = this.appendSortHttpParams(gridConfig.sortFields, params );

    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    //console.log( ' service getGridData gridConfig =', gridConfig);
    console.log( ' params =', params);
    return this.http
      .get<any>('/api/DCR', { params })
      .pipe(
        map((res) => {
          console.log(' res=', res)
          return res;
        })
      );
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

  /*

          const val = this.mappingKey(aSort.sortField) + '.' + aSort.convertDirection();
        if (sorts.multiSort) {
          params = params.append('order[]', val.toString());

    getRequestParams(loadParams: SunLoadRecordParams): HttpParams {
    let httpParams = new HttpParams();
    for (const key in loadParams) {
      if (loadParams.hasOwnProperty(key)) {
        const obj: any = loadParams[key as keyof SunLoadRecordParams];
        if (!obj) {
          continue;
        }
        if (key === 'filters') {
          httpParams = this.appendFilterHttpParams(obj, httpParams);
        } else if (key === 'sorts') {
          httpParams = this.appendSortHttpParams(obj, httpParams);
        } else if (key === 'pagination') {
          httpParams = this.appendPaginationHttpParams(obj, httpParams);
        } else if (key === 'columns') {
          httpParams = this.appendGridColumnStateParams(obj, httpParams);
        }
      }
    }
    return httpParams;
  }


    // Single column sort with order=position.asc
  // Multi-Sort column sort with order[]=position.asc&order[]=another_position.desc. The first sort == main sort
  appendSortHttpParams(sorts: SunSorts, params: HttpParams): HttpParams {
    const sortlist = sorts.sorts;
    if (sortlist && sortlist.length > 0) {
      sortlist.reverse().forEach((aSort) => {
        const val = this.mappingKey(aSort.sortField) + '.' + aSort.convertDirection();
        if (sorts.multiSort) {
          params = params.append('order[]', val.toString());
          if (aSort.convertDirection() === 'asc') {
            params = params.append('sort[]', this.mappingKey(aSort.sortField));
          } else {
            params = params.append('sort[]', '-' + this.mappingKey(aSort.sortField));
          }
        } else {
          params = params.append('order', val.toString());
          if (aSort.convertDirection() === 'asc') {
            params = params.append('sort', this.mappingKey(aSort.sortField));
          } else {
            params = params.append('sort', '-' + this.mappingKey(aSort.sortField));
          }
        }
      });
      sortlist.reverse();
    }
    return params;
  }

      const begin = Number(query.get('offset')[0]);
    const end = Number(query.get('limit')[0]) + begin;

      appendPaginationHttpParams(pagination: SunPagination, params: HttpParams): HttpParams {
    const offset = pagination.offset > 0 ? pagination.offset : 0;
    const limit = pagination.limit;
    params = params.append('offset', offset.toString());
    params = params.append('page[offset]', offset.toString());
    params = params.append('start', offset.toString());
    params = params.append('limit', limit.toString());
    params = params.append('page[limit]', limit.toString());
    return params;
  }

    */

}
