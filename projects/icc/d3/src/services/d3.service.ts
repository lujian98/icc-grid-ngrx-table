import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IccBackendService } from '@icc/ui/core';
import { IccD3Config, IccD3ChartConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IccD3Service {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getRemoteD3Config(d3Config: IccD3Config): Observable<IccD3Config> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3Config', d3Config.chartName);
    const url = this.backendService.apiUrl;
    return this.http.get<any>(url, { params }).pipe(
      map((res) => {
        return {
          ...d3Config,
          ...res,
        };
      }),
    );
  }

  getD3ChartConfigs(d3Config: IccD3Config): Observable<IccD3ChartConfig[]> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3ChartConfigs', d3Config.chartName);
    const url = this.backendService.apiUrl;
    return this.http.get<IccD3ChartConfig[]>(url, { params }).pipe(
      map((res) => {
        return [...res];
      }),
    );
  }

  getD3Data(d3Config: IccD3Config): Observable<any[]> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3Data', d3Config.chartName);
    const url = this.backendService.apiUrl;
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        return [...res];
      }),
    );
  }
}
