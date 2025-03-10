import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccDashboardConfig, IccDashboardSetting, IccTile } from '../models/dashboard.model';
import * as dashboardActions from './dashboard.actions';
import {
  selectDashboardConfig,
  //selectDashboardOptions,
  selectDashboardSetting,
  selectDashboardTiles,
} from './dashboard.selectors';

@Injectable()
export class IccDashboardFacade {
  private store = inject(Store);

  initDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.initDashboardConfig({ dashboardId, dashboardConfig }));
    if (dashboardConfig.remoteConfig) {
      this.store.dispatch(dashboardActions.loadRemoteDashboardConfig({ dashboardId, dashboardConfig }));
    }

    //if (dashboardConfig.remoteOptions && !dashboardConfig.remoteConfig) {
    //  this.store.dispatch(dashboardActions.loadDashboardOptions({ dashboardId, dashboardConfig }));
    //}
  }

  setDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.loadDashboardConfigSuccess({ dashboardId, dashboardConfig }));
  }

  setDashboardTiles(dashboardId: string, tiles: IccTile<unknown>[]): void {
    this.store.dispatch(dashboardActions.loadDashboardTilesSuccess({ dashboardId, tiles }));
  }

  /*

  setDashboardOptions(dashboardId: string, options: IccTabConfig[]): void {
    this.store.dispatch(dashboardActions.loadDashboardOptionsSuccess({ dashboardId, options }));
  }

  setSelectedIndex(dashboardId: string, index: number): void {
    this.store.dispatch(dashboardActions.setSelectedIndex({ dashboardId, index }));
  }

  setAddTab(dashboardId: string, tab: IccTabConfig): void {
    this.store.dispatch(dashboardActions.setAddTab({ dashboardId, tab }));
  }

  setDragDropTab(dashboardId: string, previousIndex: number, currentIndex: number): void {
    this.store.dispatch(dashboardActions.setDragDropTab({ dashboardId, previousIndex, currentIndex }));
  }

  setContextMenuClicked(dashboardId: string, menuItem: IccMenuConfig, tab: IccTabConfig, index: number): void {
    this.store.dispatch(dashboardActions.setContextMenuClicked({ dashboardId, menuItem, tab, index }));
  }

  setCloseTab(dashboardId: string, tab: IccTabConfig): void {
    this.store.dispatch(dashboardActions.setCloseTab({ dashboardId, tab }));
  }
    */

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
  /*
  selectDashboardOptions(dashboardId: string): Observable<IccTabConfig[]> {
    return this.store.select(selectDashboardOptions(dashboardId));
  }*/
}
