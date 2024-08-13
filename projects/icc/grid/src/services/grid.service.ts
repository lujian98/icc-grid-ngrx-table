import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getGridData<T>(gridName: string, gridData?: IccGridData<T>): Observable<IccGridData<T>> {
    //console.log(' service get =', gridData)
    //const data: IccGridData<any> = CARSDATA;
   // return of(data);
   const params = { };
   return this.http
     .get<any>('/api/DCR', params)
     .pipe(
      map((res)=> {
        console.log( ' res=', res)
        return res;
      })
     );
  }

}
