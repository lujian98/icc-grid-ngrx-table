import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IccColumnConfig, IccGridConfig } from '../models/grid-column.model';

@Injectable({
  providedIn: 'root',
})
export class IccGridService {
  // private http = inject(HttpClient);



  getGridConfig(gridName: string, gridConfig: IccGridConfig): Observable<IccGridConfig> {
    console.log(' service config =', gridConfig)
    return of(gridConfig);
    /*
    return this.http
      .get<EmailResponse>(this.endpointService.buildUrl('smtp_settings'))
      .pipe(map(this.adapter.adapt));
      */
  }

  getGridColumnConfig(gridName: string, columnConfig: IccColumnConfig[]): Observable<IccColumnConfig[]> {
    console.log(' service columnConfig =', columnConfig)
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

  /*
    sendTestEmail(
      testEmail: TestEmail
    ): Observable<SunHttpErrorModel | undefined> {
      const params = { to_address: testEmail.recipientEmailAddress };
      return this.http
        .post(this.endpointService.buildUrl('smtp_settings/test'), params)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => sunNormalizeHttpError(error));
          })
        );
    }*/
}
