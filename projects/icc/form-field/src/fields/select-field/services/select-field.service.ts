import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
/*
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
*/

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private http = inject(HttpClient);

  /*
  getGridConfig(gridName: string, gridConfig: IccGridConfig): Observable<IccGridConfig> {
    //console.log(' service config =', gridConfig)
    return of(gridConfig);

  }

  getGridColumnsConfig(gridName: string, columnsConfig: IccColumnConfig[]): Observable<IccColumnConfig[]> {
    console.log(' get remote service columnConfig =', gridName);
    const config: IccColumnConfig[] = [
      {
        name: 'ID',
        width: 50,
        align: 'center',
      },
      {
        name: 'vin',
      },
      {
        name: 'brand',
        hidden: false,
        filterField: false,
      },
      {
        name: 'year',
        sortField: false,
      },
      {
        name: 'color',
      },
    ];

    return of(config);
  }


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
    const urlKey = gridConfig.urlKey || gridConfig.gridName;
    return this.http.get<IccGridData<T>>(`/api/${urlKey}`, { params }).pipe(
      map((res) => {
        console.log(' res=', res);
        return res;
      }),
    );
  }
*/
}
