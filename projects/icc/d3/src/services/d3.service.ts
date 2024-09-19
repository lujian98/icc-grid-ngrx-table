import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IccBackendService } from '@icc/ui/core';
import { IccD3Config, IccD3Options, IccD3ChartConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IccD3Service {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getRemoteD3Config(d3Config: IccD3Config): Observable<IccD3Config> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3Config');
    const url = this.backendService.apiUrl;

    const options: IccD3Options = {
      margin: { top: 50, right: 80, bottom: 10, left: 10 },
    };

    const config = {
      ...d3Config,
      options: { ...options },
    };
    console.log(' get renote config =', config);
    return of(config);
    return this.http.get<any>(url, { params }).pipe(
      map((res) => {
        //console.log(' d3Config res=', res);
        return {
          ...d3Config,
          ...res,
        };
      }),
    );
  }

  getD3ChartConfigs(d3Config: IccD3Config): Observable<any[]> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3Fields');
    const url = this.backendService.apiUrl;

    const chartConfigs: IccD3ChartConfig[] = [
      {
        chartType: 'lineChart',
        xScaleType: 'linear',
        useInteractiveGuideline: true,
        x0: (d: any) => d.key,
        y0: (d: any) => d.values,
        drawColor: (d: any, i: number) => d.key,
        xAxis: {
          axisLabel: 'Time (ms)',
          textAnchor: 'end',
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          textAnchor: 'end',
          rotate: -90,
          axisLabelDistance: -40,
        },
        zoom: {
          enabled: true,
          horizontalOff: true,
          horizontalBrushShow: false,
          verticalOff: false,
          verticalBrushShow: true,
        },
      },
      {
        chartType: 'areaChart',
      },
    ];

    return of(chartConfigs);
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        //console.log(' d3Fields res=', res);
        return [...res];
      }),
    );
  }

  getD3Data(d3Config: IccD3Config): Observable<any[]> {
    const params = this.backendService.getParams(d3Config.urlKey, 'd3Data');
    const url = this.backendService.apiUrl;
    const data = this.getData();
    return of(data);
    return this.http.get<any[]>(url, { params }).pipe(
      map((res) => {
        //console.log(' d3Data res=', res);
        return res;
      }),
    );
  }

  private getData(): any[] {
    const sin = [];
    const sin2 = [];
    const cos = [];
    for (let i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / 10) });
      sin2.push({ x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
      cos.push({ x: i, y: 0.5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
    }
    return [
      {
        values: sin, // values - represents the array of {x,y} data points
        key: 'Sine Wave', // key  - the name of the series.
        color: '#ff7f0e', // color - optional: choose your own line color.
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        chartType: 'areaChart', // area - set to true if you want this line to turn into a filled area chart.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c',
      },
    ];
  }
}
