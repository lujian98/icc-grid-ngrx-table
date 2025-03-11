import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccDashboardConfig, IccDashboardSetting, IccTile } from '../models/dashboard.model';
import * as dashboardActions from './dashboard.actions';
import { selectDashboardConfig, selectDashboardSetting, selectDashboardTiles } from './dashboard.selectors';

@Injectable()
export class IccDashboardFacade {
  private store = inject(Store);

  initDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.initDashboardConfig({ dashboardId, dashboardConfig }));
    if (dashboardConfig.remoteConfig) {
      this.store.dispatch(dashboardActions.loadRemoteDashboardConfig({ dashboardId, dashboardConfig }));
    }
  }

  setDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.loadDashboardConfigSuccess({ dashboardId, dashboardConfig }));
  }

  setDashboardTiles(dashboardId: string, tiles: IccTile<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardTilesSuccess({ dashboardId, tiles }));
  }

  loadDashboardGridMapTiles(dashboardId: string, gridMap: number[][], tiles: IccTile<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardGridMapTiles({ dashboardId, gridMap, tiles }));
  }

  setGridViewport(dashboardId: string, width: number, height: number): void {
    this.store.dispatch(dashboardActions.setGridViewport({ dashboardId, width, height }));
  }

  clearDashboardStore(dashboardId: string): void {
    this.store.dispatch(dashboardActions.clearDashboardStore({ dashboardId }));
  }

  selectSetting(dashboardId: string): Observable<IccDashboardSetting> {
    return this.store.select(selectDashboardSetting(dashboardId));
  }

  selectDashboardConfig(dashboardId: string): Observable<IccDashboardConfig> {
    return this.store.select(selectDashboardConfig(dashboardId));
  }

  selectDashboardTiles(dashboardId: string): Observable<IccTile<unknown>[]> {
    return this.store.select(selectDashboardTiles(dashboardId));
  }
}
