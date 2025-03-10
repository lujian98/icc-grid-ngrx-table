import { Injectable, inject } from '@angular/core';
import { IccMenuConfig } from '@icc/ui/menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccTabConfig, IccDashboardConfig, IccDashboardSetting } from '../models/dashboard.model';
import * as dashboardActions from './dashboard.actions';
import {
  selectDashboardConfig,
  selectDashboardOptions,
  selectDashboardSetting,
  selectDashboardDashboard,
} from './dashboard.selectors';

@Injectable()
export class IccDashboardFacade {
  private store = inject(Store);

  initDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.initDashboardConfig({ dashboardId, dashboardConfig }));
    if (dashboardConfig.remoteConfig) {
      this.store.dispatch(dashboardActions.loadRemoteDashboardConfig({ dashboardId, dashboardConfig }));
    }

    if (dashboardConfig.remoteOptions && !dashboardConfig.remoteConfig) {
      this.store.dispatch(dashboardActions.loadDashboardOptions({ dashboardId, dashboardConfig }));
    }
  }

  setDashboardConfig(dashboardId: string, dashboardConfig: IccDashboardConfig): void {
    this.store.dispatch(dashboardActions.loadDashboardConfigSuccess({ dashboardId, dashboardConfig }));
  }

  setDashboardDashboard(dashboardId: string, dashboard: IccTabConfig[]): void {
    this.store.dispatch(dashboardActions.loadDashboardDashboardSuccess({ dashboardId, dashboard }));
  }

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

  clearDashboardStore(dashboardId: string): void {
    this.store.dispatch(dashboardActions.clearDashboardStore({ dashboardId }));
  }

  selectSetting(dashboardId: string): Observable<IccDashboardSetting> {
    return this.store.select(selectDashboardSetting(dashboardId));
  }

  selectDashboardConfig(dashboardId: string): Observable<IccDashboardConfig> {
    return this.store.select(selectDashboardConfig(dashboardId));
  }

  selectDashboardDashboard(dashboardId: string): Observable<IccTabConfig[]> {
    return this.store.select(selectDashboardDashboard(dashboardId));
  }

  selectDashboardOptions(dashboardId: string): Observable<IccTabConfig[]> {
    return this.store.select(selectDashboardOptions(dashboardId));
  }
}
