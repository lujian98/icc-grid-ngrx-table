import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccTabsConfig, IccTabsSetting, IccTabConfig } from '../models/tabs.model';
import * as tabsActions from './tabs.actions';
import { selectTabsSetting, selectTabsConfig, selectTabsOptions } from './tabs.selectors';

@Injectable()
export class IccTabsFacade {
  private store = inject(Store);

  initTabsConfig(tabsId: string, tabsConfig: IccTabsConfig): void {
    this.store.dispatch(tabsActions.initTabsConfig({ tabsId, tabsConfig }));
    if (tabsConfig.remoteConfig) {
      this.store.dispatch(tabsActions.loadRemoteTabsConfig({ tabsId, tabsConfig }));
    }

    if (tabsConfig.remoteOptions && !tabsConfig.remoteConfig) {
      this.store.dispatch(tabsActions.loadTabsOptions({ tabsId, tabsConfig }));
    }
  }

  setTabsOptions(tabsId: string, options: IccTabConfig[]): void {
    this.store.dispatch(tabsActions.loadTabsOptionsSuccess({ tabsId, options }));
  }

  clearTabsStore(tabsId: string): void {
    this.store.dispatch(tabsActions.clearTabsStore({ tabsId }));
  }

  selectSetting(tabsId: string): Observable<IccTabsSetting | undefined> {
    return this.store.select(selectTabsSetting(tabsId));
  }

  tabsConfig(tabsId: string): Observable<IccTabsConfig | undefined> {
    return this.store.select(selectTabsConfig(tabsId));
  }

  selectOptions(tabsId: string): Observable<IccTabConfig[]> {
    return this.store.select(selectTabsOptions(tabsId));
  }
}
