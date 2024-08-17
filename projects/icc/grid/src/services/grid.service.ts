import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IccColumnConfig, IccGridConfig, IccGridData } from '../models/grid-column.model';
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
   const offset = (gridConfig.page-1) * gridConfig.pageSize;
   const limit = gridConfig.pageSize;
   params = params.append('offset', offset.toString());
   params = params.append('limit', limit.toString());
   console.log( ' service getGridData gridConfig =', gridConfig);
   console.log( ' params =', params);
   //const params = { };
   return this.http
     .get<any>('/api/DCR', { params })
     .pipe(
      map((res)=> {
        console.log( ' res=', res)
        return res;
      })
     );
  }

  /*
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
