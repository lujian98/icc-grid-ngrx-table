import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccD3Config } from '../models/d3.model';
import { IccD3ChartConfig } from '../models/options.model';
import * as d3Actions from './d3.actions';
import { selectD3Config, selectD3ChartConfigs, selectD3Data } from './d3.selectors';

@Injectable()
export class IccD3Facade {
  private store = inject(Store);

  initD3Config(d3Config: IccD3Config): void {
    this.store.dispatch(d3Actions.initD3Config({ d3Config }));

    if (d3Config.remoteD3Config) {
      this.store.dispatch(d3Actions.loadRemoteD3Config({ d3Config }));
    } else if (d3Config.remoteChartConfigs) {
      this.store.dispatch(d3Actions.loadD3ChartConfigs({ d3Config }));
    }
  }

  setD3ChartConfigs(d3Config: IccD3Config, chartConfigs: IccD3ChartConfig[]): void {
    this.store.dispatch(d3Actions.loadD3ChartConfigsSuccess({ d3Config, chartConfigs }));
  }

  setD3Data(d3Config: IccD3Config, data: any): void {
    this.store.dispatch(d3Actions.getD3DataSuccess({ d3Config, data }));
  }

  cleard3DataStore(d3Id: string): void {
    this.store.dispatch(d3Actions.clearD3DataStore({ d3Id }));
  }

  selectD3Config(d3Id: string): Observable<IccD3Config> {
    return this.store.select(selectD3Config(d3Id));
  }

  selectD3ChartConfigs(d3Id: string): Observable<any[] | undefined> {
    return this.store.select(selectD3ChartConfigs(d3Id));
  }

  selectD3Data(d3Id: string): Observable<any> {
    return this.store.select(selectD3Data(d3Id));
  }
}
