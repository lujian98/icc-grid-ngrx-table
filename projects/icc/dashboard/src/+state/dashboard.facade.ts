import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccDashboardConfig, IccDashboardSetting, IccTile, IccTileOption } from '../models/dashboard.model';
import * as dashboardActions from './dashboard.actions';
import { selectDashboardConfig, selectDashboardSetting, selectDashboardTiles } from './dashboard.selectors';

@Injectable()
export class IccDashboardFacade {
  private store = inject(Store);

  private _featureName: string = '';
  set featureName(value: string) {
    this._featureName = value;
  }
  get featureName(): string {
    return this._featureName;
  }

  initDashboardConfig(dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.initDashboardConfig({ dashboardConfig }));
    if (dashboardConfig.remoteConfig) {
      this.store.dispatch(dashboardActions.loadRemoteDashboardConfig({ dashboardConfig }));
    }
  }

  setDashboardConfig(dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.loadDashboardConfigSuccess({ dashboardConfig }));
  }

  setDashboardOptions(options: IccTileOption<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardOptions({ options }));
  }

  setDashboardTiles(tiles: IccTile<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardTilesSuccess({ tiles }));
  }

  loadDashboardGridMapTiles(gridMap: number[][], tiles: IccTile<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardGridMapTiles({ gridMap, tiles }));
  }

  setGridViewport(width: number, height: number): void {
    this.store.dispatch(dashboardActions.setGridViewport({ width, height }));
  }

  removeDashboardStore(): void {
    this.store.dispatch(dashboardActions.removeDashboardStore({ featureName: this.featureName }));
  }

  selectSetting(): Observable<IccDashboardSetting> {
    return this.store.select(selectDashboardSetting(this.featureName));
  }

  selectDashboardConfig(): Observable<IccDashboardConfig> {
    return this.store.select(selectDashboardConfig(this.featureName));
  }

  selectDashboardTiles(): Observable<IccTile<unknown>[]> {
    console.log(' this.featureName=', this.featureName);
    return this.store.select(selectDashboardTiles(this.featureName));
  }
}
